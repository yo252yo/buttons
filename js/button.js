const CANVAS_TO_JS_COLORS = {
  "0": "grey",
  "2": "orange",
  "4": "green",
  "5": "blue",
  "6": "purple",
};

class Button {
  constructor({ id, emoji, title, content, color, children = [] }) {
    this.id = id;
    this.emoji = emoji;
    this.title = title;
    this.content = content;
    this.color = color;
    this.children = children;
  }

  static fromCanvasNode(node, children = []) {
    let text = node.text || "";
    text = text.replace(/\"/g, '"').replace(/\\\\/g, '\\');
    text = text.replace(/\n/g, "<br />\n");

    let emoji = "", title = text, content = "";

    if (text.includes("---")) {
      const idx = text.indexOf("---");
      title = text.substring(0, idx).trim();
      content = text.substring(idx + 9).trim();
    }

    const titlePart = title.split(" ");
    const first = titlePart[0];
    if (first && first.length === 1 && !first.match(/[a-zA-Z]/)) {
      emoji = first;
      title = titlePart.slice(1).join(" ");
    }
    const color = CANVAS_TO_JS_COLORS[node.color] || "grey";


    return new Button({
      id: node.id,
      emoji,
      title,
      content,
      color,
      children,
    });
  }
}

export { Button };
