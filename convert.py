#!/usr/bin/env python3
import argparse
import json
import re
import sys
import uuid
from pathlib import Path

CANVAS_COLORS = {"grey", "green", "blue", "purple", "orange"}
JS_TO_CANVAS_COLORS = {
    "grey": "0",
    "green": "4",
    "blue": "5",
    "purple": "6",
    "orange": "2",
}
CANVAS_TO_JS_COLORS = {
    "0": "grey",
    "2": "orange",
    "4": "green",
    "5": "blue",
    "6": "purple",
}


def parse_js_file(content: str) -> tuple[dict, dict]:
    buttons = {}
    links = {}

    button_pattern = re.compile(
        r"""BUTTONS\["([^"]+)"\]\s*=\s*\{([^}]+)\}""", re.DOTALL
    )
    link_pattern = re.compile(r"""LINKS\["([^"]+)"\]\s*=\s*\[([^\]]*)\]""", re.DOTALL)

    for match in button_pattern.finditer(content):
        key = match.group(1)
        body = match.group(2)
        btn = {}

        emoji_match = re.search(r'"emoji"\s*:\s*"([^"]*)"', body)
        if emoji_match:
            btn["emoji"] = emoji_match.group(1)

        color_match = re.search(r'"color"\s*:\s*"([^"]*)"', body)
        if color_match:
            btn["color"] = color_match.group(1)

        title_match = re.search(r'"title"\s*:\s*"([^"]*)"', body)
        if title_match:
            btn["title"] = title_match.group(1)

        content_match = re.search(r"`([^`]*)`", body)
        if content_match:
            raw_content = content_match.group(1)
            normalized = (
                raw_content.replace("<br />", "\n")
                .replace("<br/>", "\n")
                .replace("<br>", "\n")
            )
            while "\n\n" in normalized:
                normalized = normalized.replace("\n\n", "\n")
            btn["content"] = normalized

        buttons[key] = btn

    for match in link_pattern.finditer(content):
        key = match.group(1)
        body = match.group(2).strip()
        if body:
            link_items = re.findall(r'"([^"]+)"', body)
            links[key] = link_items
        else:
            links[key] = []

    return buttons, links


def js_to_canvas(buttons: dict, links: dict) -> dict:
    nodes = []
    edges = []
    node_ids = {}
    key_positions = {}
    used_ids = set()

    keys = list(buttons.keys())

    def find_parents(key):
        parents = []
        for pk, tk in links.items():
            if key in tk:
                parents.append(pk)
        return parents[0] if parents else None

    for key in keys:
        if key not in used_ids:
            node_ids[key] = key
        else:
            node_ids[key] = str(uuid.uuid4())
        used_ids.add(node_ids[key])

    def assign_positions(key, x, y, visited=None):
        if visited is None:
            visited = set()
        if key in visited:
            return
        visited.add(key)

        siblings = links.get(key, [])
        for i, sib in enumerate(siblings):
            assign_positions(sib, x + i * 350, y + 300, visited)

        key_positions[key] = (x, y)

    root_keys = [k for k in keys if not find_parents(k)]
    if not root_keys:
        root_keys = [keys[0]]

    y = 0
    for root in root_keys:
        assign_positions(root, 0, y, set())
        y += 300

    for key in keys:
        node_id = node_ids[key]
        btn = buttons[key]
        x, y = key_positions[key]

        emoji = btn.get("emoji", "")
        title = btn.get("title", "")
        content = btn.get("content", "").replace("\n", "<br>")
        color = JS_TO_CANVAS_COLORS.get(btn.get("color", "grey"), 0)

        text_content = f"{emoji} {title}\n---\n{content}".strip()

        nodes.append(
            {
                "id": node_id,
                "type": "text",
                "text": text_content,
                "color": str(color),
                "x": x,
                "y": y,
                "width": 300,
                "height": 200,
            }
        )

    for key, target_keys in links.items():
        if key in node_ids and target_keys:
            for target_key in target_keys:
                if target_key in node_ids:
                    edges.append(
                        {
                            "id": str(uuid.uuid4()),
                            "fromNode": node_ids[key],
                            "fromSide": "bottom",
                            "toNode": node_ids[target_key],
                            "toSide": "top",
                        }
                    )

    return {"nodes": nodes, "edges": edges}


def canvas_to_js(data: dict) -> tuple[dict, dict]:
    buttons = {}
    links = {}
    node_id_to_key = {}
    used_js_keys = set()

    for node in data.get("nodes", []):
        node_id = node.get("id", "")
        text = node.get("text", "")
        color_val = node.get("color", "") or ""
        color = CANVAS_TO_JS_COLORS.get(str(color_val), "grey")

        text = text.strip()

        if "---" in text:
            idx = text.find("---")
            title_line = text[:idx].strip()
            content = text[idx + 3 :].strip()
        else:
            title_line = text.strip()
            content = ""

        title_parts = title_line.split(" ", 1)
        if len(title_parts) > 1:
            first_word = title_parts[0]
            if not first_word.isalpha():
                emoji = first_word
                title = title_parts[1]
            else:
                emoji = ""
                title = title_line
        else:
            emoji = ""
            title = title_line

        base_key = node_id

        if node_id in used_js_keys:
            base_key = str(uuid.uuid4())

        used_js_keys.add(base_key)
        node_id_to_key[node_id] = base_key
        fixed_content = content.replace("<br>", "<br />").replace("<br/>", "<br />")
        buttons[base_key] = {
            "emoji": emoji,
            "color": color,
            "title": title,
            "content": fixed_content,
        }

    for edge in data.get("edges", []):
        from_node = edge.get("fromNode")
        to_node = edge.get("toNode")
        if not from_node or not to_node:
            continue

        from_key = node_id_to_key.get(from_node)
        to_key = node_id_to_key.get(to_node)

        if from_key and to_key:
            if from_key not in links:
                links[from_key] = []
            if to_key not in links[from_key]:
                links[from_key].append(to_key)

    for key in buttons:
        if key not in links:
            links[key] = []

    return buttons, links


def write_js(buttons: dict, links: dict) -> str:
    lines = ["\nconst BUTTONS = {};\n\n", "const LINKS = {};\n\n"]

    for key in buttons:
        btn = buttons[key]
        lines.append(f'BUTTONS["{key}"] = {{\n')
        lines.append(f'  "emoji": "{btn.get("emoji", "")}",\n')
        lines.append(f'  "color": "{btn.get("color", "grey")}",\n')
        lines.append(f'  "title": "{btn.get("title", "")}",\n')
        content = (
            btn.get("content", "")
            .replace("\\", "\\\\")
            .replace('"', '\\"')
            .replace("<br />", "<br />\n")
            .replace("\n\n", "\n")
        )
        lines.append(f'  "content": `{content}`\n')
        lines.append("};\n")

        link_list = links.get(key, [])
        links_str = ", ".join(f'"{l}"' for l in link_list)
        lines.append(f'LINKS["{key}"] = [{links_str}];\n\n')

    lines.append("\nexport { BUTTONS, LINKS };\n")
    return "".join(lines)


def write_canvas(data: dict) -> str:
    return json.dumps(data, indent=2)


def convert(input_file: str, output_file: str, direction: str):
    input_path = Path(input_file)
    output_path = Path(output_file)

    if direction == "js_to_canvas":
        content = input_path.read_text(encoding="utf-8")
        buttons, links = parse_js_file(content)
        canvas_data = js_to_canvas(buttons, links)
        output_path.write_text(write_canvas(canvas_data), encoding="utf-8")
        print(f"Converted {input_file} -> {output_file}")
    else:
        content = input_path.read_text(encoding="utf-8")
        canvas_data = json.loads(content)
        buttons, links = canvas_to_js(canvas_data)
        output_path.write_text(write_js(buttons, links), encoding="utf-8")
        print(f"Converted {input_file} -> {output_file}")


def main():
    parser = argparse.ArgumentParser(
        description="Convert between story.js and story.canvas formats"
    )
    parser.add_argument(
        "direction",
        choices=["js_to_canvas", "canvas_to_js"],
        help="Conversion direction",
    )
    parser.add_argument("-i", "--input", default="js/story.js", help="Input file")
    parser.add_argument(
        "-o", "--output", help="Output file (default: derived from input)"
    )

    args = parser.parse_args()

    if args.output:
        convert(args.input, args.output, args.direction)
    else:
        if args.direction == "js_to_canvas":
            output = args.input.replace(".js", ".canvas")
        else:
            output = args.input.replace(".canvas", ".js")
        convert(args.input, output, args.direction)


if __name__ == "__main__":
    main()
