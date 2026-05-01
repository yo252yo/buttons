#!/usr/bin/env python3
import argparse
import json
import re
import uuid
from pathlib import Path

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


def get_roots(keys, links):
    all_children = set()
    for children in links.values():
        all_children.update(children)
    return [k for k in keys if k not in all_children]


def js_content_to_canvas(raw):
    raw = raw.replace("<br />", "\n").replace("<br/>", "\n").replace("<br>", "\n")
    while "\n\n" in raw:
        raw = raw.replace("\n\n", "\n")
    return raw


def parse_js_button(body):
    btn = {}
    emoji = re.search(r'"emoji"\s*:\s*"([^"]*)"', body)
    color = re.search(r'"color"\s*:\s*"([^"]*)"', body)
    title = re.search(r'"title"\s*:\s*"([^"]*)"', body)
    content = re.search(r"`([^`]*)`", body)

    if emoji:
        btn["emoji"] = emoji.group(1)
    if color:
        btn["color"] = color.group(1)
    if title:
        btn["title"] = title.group(1)
    if content:
        btn["content"] = js_content_to_canvas(content.group(1))
    return btn


def parse_js(content):
    buttons = {}
    links = {}
    btn_pat = re.compile(r"""BUTTONS\["([^"]+)"\]\s*=\s*\{([^}]+)\}""", re.DOTALL)
    link_pat = re.compile(r"""LINKS\["([^"]+)"\]\s*=\s*\[([^\]]*)\]""", re.DOTALL)

    for m in btn_pat.finditer(content):
        buttons[m.group(1)] = parse_js_button(m.group(2))

    for m in link_pat.finditer(content):
        key = m.group(1)
        body = m.group(2).strip()
        links[key] = re.findall(r'"([^"]+)"', body) if body else []

    return buttons, links


def determine_canvas_position(keys, links):
    positions = {}

    def place(key, x, y, seen):
        if key in seen:
            return
        seen.add(key)
        for i, sib in enumerate(links.get(key, [])):
            place(sib, x + i * 350, y + 300, seen)
        positions[key] = (x, y)

    roots = get_roots(keys, links) or [keys[0]]
    for y, root in enumerate(roots):
        place(root, 0, y * 300, set())

    return positions


def js_to_canvas(buttons, links):
    positions = determine_canvas_position(list(buttons.keys()), links)
    node_ids = {}
    used = set()
    nodes = []
    edges = []

    for key in buttons:
        if key in used:
            node_ids[key] = str(uuid.uuid4())
        else:
            node_ids[key] = key
        used.add(key)

    for key in buttons:
        btn = buttons[key]
        x, y = positions[key]
        emoji = btn.get("emoji", "")
        title = btn.get("title", "")
        content = btn.get("content", "").replace("\n", "<br>")
        color = JS_TO_CANVAS_COLORS.get(btn.get("color", "grey"), "0")
        text = f"{emoji} {title}\n---\n{content}".strip()

        nodes.append(
            {
                "id": node_ids[key],
                "type": "text",
                "text": text,
                "color": str(color),
                "x": x,
                "y": y,
                "width": 300,
                "height": 200,
            }
        )

    for key, targets in links.items():
        if key not in node_ids:
            continue
        for target in targets:
            if target not in node_ids:
                continue
            edges.append(
                {
                    "id": str(uuid.uuid4()),
                    "fromNode": node_ids[key],
                    "fromSide": "bottom",
                    "toNode": node_ids[target],
                    "toSide": "top",
                }
            )

    return {"nodes": nodes, "edges": edges}


def _parse_text_node(text):
    text = text.strip()
    if "---" in text:
        idx = text.find("---")
        title_line = text[:idx].strip()
        content = text[idx + 3 :].strip()
    else:
        title_line = text.strip()
        content = ""

    parts = title_line.split(" ", 1)
    if len(parts) > 1 and not parts[0].isalpha():
        emoji, title = parts[0], parts[1]
    else:
        emoji, title = "", title_line

    content = content.replace("<br>", "<br />").replace("<br/>", "<br />")
    return emoji, title, content


def canvas_to_js(data):
    buttons = {}
    links = {}
    key_map = {}
    used = set()

    for node in data.get("nodes", []):
        node_id = node.get("id", "")
        color = CANVAS_TO_JS_COLORS.get(str(node.get("color", "") or ""), "grey")
        emoji, title, content = _parse_text_node(node.get("text", ""))

        if node_id in used:
            node_id = str(uuid.uuid4())
        used.add(node_id)
        key_map[node_id] = node_id
        buttons[node_id] = {
            "emoji": emoji,
            "color": color,
            "title": title,
            "content": content,
        }

    for edge in data.get("edges", []):
        from_id = edge.get("fromNode")
        to_id = edge.get("toNode")
        if from_id and to_id:
            from_key, to_key = key_map.get(from_id), key_map.get(to_id)
            if from_key and to_key:
                links.setdefault(from_key, []).append(to_key)

    for key in buttons:
        links.setdefault(key, [])

    return buttons, links


def write_js(buttons, links):
    lines = ["\nconst BUTTONS = {};\n\n", "const LINKS = {};\n\n"]

    for key in buttons:
        btn = buttons[key]
        lines.append(f'BUTTONS["{key}"] = {{\n')
        lines.append(f'  "emoji": "{btn.get("emoji", "")}",\n')
        lines.append(f'  "color": "{btn.get("color", "grey")}",\n')
        lines.append(f'  "title": "{btn.get("title", "")}",\n')
        content = btn.get("content", "").replace("\\", "\\\\").replace('"', '\\"')
        content = content.replace("<br />", "<br />\n").replace("\n\n", "\n")
        lines.append(f'  "content": `{content}`\n')
        lines.append("};\n")
        links_str = ", ".join(f'"{l}"' for l in links.get(key, []))
        lines.append(f'LINKS["{key}"] = [{links_str}];\n\n')

    lines.append("\nexport { BUTTONS, LINKS };\n")
    return "".join(lines)


def convert(in_file, out_file, direction):
    path = Path(in_file)
    out = Path(out_file)

    if direction == "js_to_canvas":
        content = path.read_text(encoding="utf-8")
        buttons, links = parse_js(content)
        canvas = js_to_canvas(buttons, links)
        out.write_text(json.dumps(canvas, indent=2), encoding="utf-8")
    else:
        canvas = json.loads(path.read_text(encoding="utf-8"))
        buttons, links = canvas_to_js(canvas)
        out.write_text(write_js(buttons, links), encoding="utf-8")

    print(f"Converted {in_file} -> {out_file}")


def main():
    parser = argparse.ArgumentParser(
        description="Convert between story.js and story.canvas"
    )
    parser.add_argument("direction", choices=["js_to_canvas", "canvas_to_js"])
    parser.add_argument("-i", "--input", default="js/story.js")
    parser.add_argument("-o", "--output")
    args = parser.parse_args()

    out = args.output
    if not out:
        out = (
            args.input.replace(".js", ".canvas")
            if args.direction == "js_to_canvas"
            else args.input.replace(".canvas", ".js")
        )

    convert(args.input, out, args.direction)


if __name__ == "__main__":
    main()
