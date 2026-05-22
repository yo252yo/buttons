# CLAUDE.md — Buttons Project

Build `index.html` — a 2D viewport map explorer that fetches `./assets/story.canvas` (Obsidian JSON format).

## Concept

A **fake OS / viewport explorer** — you're a point of view moving on a top-down 2D map. Nodes are positioned using their `x,y` coordinates from the canvas. You leave a trail behind as you move through the graph. Fog of war reveals nodes as you explore.

## Core Requirements

1. **Fetch canvas** — Load `./assets/story.canvas` on startup
2. **Start node** — Begin at node with id "start"
3. **Keyboard navigation**:
   - `W` — go back to parent (previous in visited history)
   - `S` or `Enter` or `Space` — go forward to selected child
   - `A/D` or `←/→` — navigate between children (select which one to move to)
4. **Visited history** — Keep a list of visited nodes; W backtracks along this list

## Fog of War

- **Current node**: Fully visible, expanded
- **Past/visited nodes**: Fully visible, highlighted (permanent — no forgetting)
- **Children** (one step forward): Visible faintly, title only
- **Beyond that**: Hidden

## Movement & Animation

1. **Select** — Use A/D to highlight which child to move to
2. **Move** — Press S/Enter/Space to travel to that child
3. **Travel** — Camera smoothly pans and centers on the new node
4. **Expand** — The new node expands/pops into view
5. **Reveal** — Children "lootbox style" — pop and open with animation, colors fall into place
6. **Trail** — Visited nodes stay highlighted behind you

## Visual Design — Fake OS / Viewport Explorer

**Aesthetic**: Retro OS window, top-down map explorer feel

- Dark/subtle background (like a map or terminal)
- Nodes rendered as colored shapes/buttons
- Selected node has glow/highlight
- Connections between nodes visible as you follow them
- Smooth camera pan when moving

**Color palette** (muted rainbow):
```css
:root {
  --grey: #c8c4bf;
  --green: #00FF40;
  --blue: #00BFFF;
  --purple: #DF73FF;
  --orange: #FF9966;
  --white: #ffffff;
}
```

**Minimap** — Corner overlay showing:
- Your current position
- Trail of visited nodes
- Faint dots for nearby unvisited nodes

## Node Format

```
emoji Title
---
complement (optional)
```

- Extract emoji from first token using `Intl.Segmenter` for proper emoji detection
- Parse title/complement from `---` separator
- Title shown before visiting, full content after
- Titles are processed through `capitalize_substrings()` — see `js/capitals.js` for the list of substrings that get capitalized (e.g., "HUMAN", "BUTTON", "STORY")

## Canvas Format (Obsidian)

```json
{
  "nodes": [
    { "id": "...", "type": "text", "text": "...", "x": 0, "y": 0, "color": "4", "width": 300, "height": 200 }
  ],
  "edges": [
    { "id": "...", "fromNode": "...", "toNode": "...", "fromSide": "bottom", "toSide": "top", "color": "1" }
  ]
}
```

### Obsidian Color → Semantic Color Mapping

From `js/button.js`:

| Obsidian Color | Semantic | CSS Var |
|----------------|----------|---------|
| "0" | grey | --grey |
| "1" | white | --white |
| "2" | orange | --orange |
| "3" | white | --white |
| "4" | green | --green |
| "5" | blue | --blue |
| "6" | purple | --purple |

### Example from story.canvas

**Start node:**
```json
{"id":"start","type":"text","text":"⭐ Start\n---\nThis game is about buttons.","x":5115,"y":4020,"width":300,"height":200,"color":"4"}
```

**Edges from start:**
```json
{"id":"3ce8bc078dc9f90d","fromNode":"start","fromSide":"bottom","toNode":"title","toSide":"top"}
```

**Nearby nodes around start:**
```json
{"id":"title_button","type":"text","text":"<h1>Push YOUR Buttons!</h1>---\nPush the ⭐ Start button!","x":5115,"y":3760,"width":300,"height":200,"color":"2"},
{"id":"title","type":"text","text":"⭐ The true story of the story of Robinson Crusoe\n---","x":-1937,"y":2815,"width":300,"height":200,"color":"4"},
{"id":"d674c3e21ca88716","type":"text","text":"⭐ The Life of Daniel Defoe\n---\nIn a very condensed format.","x":-3485,"y":2420,"width":1260,"height":945,"color":"4"}
```

**Node types**: "text" (main content), "group" (container with label), "file" (reference to another .canvas)

### Edge Format Details

Edges include position info for connection visualization:
```json
{
  "id": "3ce8bc078dc9f90d",
  "fromNode": "start",
  "fromSide": "bottom",
  "toNode": "title",
  "toSide": "top",
  "color": "4"  // optional, uses node color when absent
}
```

## Loading Pattern

From `js/canvas.js`:
1. Fetch `./assets/story.canvas`
2. Parse nodes into Button objects using `Button.fromCanvasNode(node, [])`
3. Build children array by iterating edges: `buttons[from].children.push(to)`
4. Sort children by x position (left to right) for consistent A/D navigation

## Constraints

- Desktop only (no mobile support needed)
- Canvas is readonly — don't modify .canvas files
- Use Nunito font
- Vanilla JS, minimal and maintainable

Go.