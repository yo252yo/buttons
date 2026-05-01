# Conversion Documentation

## Overview

`convert.py` converts between `story.js` (button definitions) and `story.canvas` (Obsidian canvas) formats.

## Usage

```bash
# js to canvas
python convert.py js_to_canvas -i js/story.js -o js/story.canvas

# canvas to js
python convert.py canvas_to_js -i js/story.canvas -o js/story.js
```

Or use `run.sh` for interactive mode:
```bash
./run.sh
```

## Format Spec

### JS Format (`story.js`)

```js
const BUTTONS = {};
const LINKS = {};

BUTTONS["start"] = {
  "emoji": "⭐",
  "color": "green",
  "title": "Start",
  "content": `Content here`
};
LINKS["start"] = ["next_button", "another"];

export { BUTTONS, LINKS };
```

### Canvas Format (`story.canvas`)

```json
{
  "nodes": [
    {
      "id": "uuid",
      "type": "text",
      "text": "emoji? title\n---\ncontent",
      "color": "4",
      "x": 0,
      "y": 0,
      "width": 300,
      "height": 200
    }
  ],
  "edges": [
    {
      "id": "uuid",
      "fromNode": "source-id",
      "fromSide": "bottom",
      "toNode": "target-id",
      "toSide": "top"
    }
  ]
}
```

### Node Text Format

```
emoji title
---
content
```

- Emoji is optional (single character)
- `---` separates title from content
- If no emoji, just `title\n---\ncontent`

## Color Mapping

These are the only allowed colors (strings):

| JS Color | Canvas Color |
|---------|-------------|
| grey    | "0"/empty  |
| green   | "4"        |
| blue    | "5"        |
| purple  | "6"        |
| orange  | "2"        |

## Line Breaks

### JS Format
Uses `<br />` for line breaks in content, followed by `\n` for code readability:
```js
"content": `Line one.<br />
Line two.<br />
Line three.`
```

### Canvas Format
Uses plain `\n` for line breaks in node text (cleaner, no HTML):
```json
"text": "emoji title\n---\nLine one.\nLine two.\nLine three."
```

### Conversion Behavior
- **JS → Canvas**: Converts `<br />` to `\n` (removes HTML)
- **Canvas → JS**: Converts `\n` back to `<br />` (adds HTML for readability)
- Also handles escaped quotes: `\"` in JS ↔ `\\"` in canvas
