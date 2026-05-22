# CLAUDE.md — Buttons Project

Build `index.html` — a 2D graph explorer that fetches `./assets/story.canvas` (Obsidian JSON format).

## Concept

A **2D graph you physically move through**. The canvas is rendered as a spatial map using each node's real `x,y` coordinates. You are always centered on the current node; the camera pans to follow you. Edges are drawn as visible lines/curves on the canvas. Fog of war hides nodes and edges you haven't reached yet — they are revealed as you explore.

The **default view is zoomed in** — you're inside the graph, reading nodes, seeing edges extending out to nearby nodes. There is a **zoom-out mode** (press `Tab` or `Z`) that pulls the camera back to show the whole graph like a minimap — this replaces a separate minimap overlay.

---

## Core Requirements

1. **Fetch canvas** — Load `./assets/story.canvas` on startup
2. **Start node** — Begin at the node with `id: "start"`
3. **Keyboard navigation**:
   - `W` — go back to parent (pop history stack)
   - `S` or `Enter` or `Space` — go forward to selected child
   - `A` / `D` or `←` / `→` — cycle between children (changes selection)
   - `Tab` or `Z` — toggle zoom-out overview mode
4. **History stack** — Keep an ordered list of visited node ids; `W` pops back along it

---

## Rendering: 2D Spatial Graph

All nodes are placed at their real canvas `x,y` coordinates. The viewport is an HTML canvas (or a CSS-transformed `<div>` layer) that pans and scales.

### Camera Behavior

- **Zoomed in (default)**: Camera is centered on the current node. Scale is comfortable for reading (~1:1 or slightly zoomed). Nearby nodes (parent, children) are visible at the edges of the screen.
- **Zoomed out (overview)**: Camera pulls back to show the whole graph. Fog of war still applies — hidden nodes are not shown. Press `Tab`/`Z` to toggle.
- Camera pan is **always animated** — smooth ease-in-out, ~500ms.
- Scale transitions (zoom in/out) are also animated.

### Edges (Connections)

Edges are the most important visual element. They must always be drawn:

- **Visited edge** (both endpoints visited): fully visible, colored line using the edge or source node color, solid.
- **Frontier edge** (from current node to unvisited child): visible but faint/dashed, in the child's color or grey.
- **Hidden edge** (neither endpoint visited): not drawn at all.

Edges are bezier curves connecting node centers. Their color follows: edge `color` field if present, else the `fromNode`'s color.

### Fog of War

| State | Node | Edges from it |
|---|---|---|
| Current | Fully visible, expanded, glowing | All edges drawn (frontier style for unvisited children) |
| Visited (past) | Fully visible, slightly dimmed | Visited edges fully drawn |
| Child (1 step away, unvisited) | Visible faintly, title only | Frontier edge drawn to it |
| Beyond (2+ steps, unvisited) | Hidden | Not drawn |

---

## Node Rendering

Nodes are rendered as rounded rectangles at their canvas coordinates, sized to fit their content (or use canvas `width`/`height` values).

### States

- **Current**: full size, full color, glowing border, content fully visible (title + complement)
- **Visited**: full color but dimmer, content fully visible, no glow
- **Child (unvisited, not selected)**: small, desaturated, title only, faint border
- **Child (unvisited, selected)**: slightly larger, more saturated, title only, bright border + a directional arrow indicator pointing from current node toward it
- **Hidden**: not rendered

### Node Content Format

```
emoji Title
---
complement (optional)
```

- Extract emoji from the first grapheme cluster using `Intl.Segmenter`
- Title is shown at all visibility states
- Complement is shown only on current and visited nodes
- Titles are processed through `capitalize_substrings()` — capitalizes specific words like "HUMAN", "BUTTON", "STORY" (list in `js/capitals.js`)

### Node Types

- `"text"` — main interactive node
- `"group"` — a container/label, render as a faint bordered region at its `x,y,width,height`; not navigable
- `"file"` — skip / ignore

---

## Navigation Feel

1. **Select** — `A`/`D` cycles the selected child. The selected child should visually "activate": brighten, scale up slightly, and the edge from current to that child highlights.
2. **Travel** — Press `S`/Enter to move to selected child. Camera smoothly pans and centers on the new node.
3. **Arrive** — New node "pops" into view (scale animation). Its children appear one by one with a staggered reveal animation ("lootbox" style: they appear sequentially, colors settling into place).
4. **Trail** — Visited nodes stay fully visible. Edges between visited nodes stay drawn.
5. **Back** — `W` pans camera back to previous node in history.

---

## Zoom-Out Overview Mode

Toggle with `Tab` or `Z`.

- Camera zooms out to fit all **revealed** nodes in view (fog-of-war still applies — hidden nodes are not shown).
- Nodes shrink to small labeled dots or tiny cards.
- All revealed edges are visible.
- Navigation keys still work in overview mode — pressing `S` to enter a node snaps the camera back in to zoomed-in mode and travels there.
- A subtle HUD label shows "OVERVIEW" when in this mode.
- This replaces the need for a separate minimap widget.

---

## Visual Design

**Aesthetic**: Dark terminal / cartographic map explorer. Retro OS feel.

**Background**: Very dark (`#0d0f12`), with a subtle grid or dot pattern that scrolls with the camera — gives a sense of physical movement through space.

**Color palette**:
```css
:root {
  --grey:   #c8c4bf;
  --green:  #00FF40;
  --blue:   #00BFFF;
  --purple: #DF73FF;
  --orange: #FF9966;
  --white:  #ffffff;
}
```

### Obsidian Color → Semantic Color Mapping

| Obsidian `color` | Semantic | CSS var |
|---|---|---|
| `"0"` | grey | `--grey` |
| `"1"` | white | `--white` |
| `"2"` | orange | `--orange` |
| `"3"` | white | `--white` |
| `"4"` | green | `--green` |
| `"5"` | blue | `--blue` |
| `"6"` | purple | `--purple` |
| (none) | grey | `--grey` |

**HUD** (top bar):
- App name: `◈ BUTTONS`
- Current node title
- Depth counter
- Key hints: `W=BACK · S=GO · A/D=SELECT · TAB=OVERVIEW`

**No separate minimap** — overview mode is the minimap.

---

## Canvas Format (Obsidian)

```json
{
  "nodes": [
    { "id": "...", "type": "text", "text": "...", "x": 0, "y": 0, "color": "4", "width": 300, "height": 200 }
  ],
  "edges": [
    { "id": "...", "fromNode": "...", "toNode": "...", "fromSide": "bottom", "toSide": "top", "color": "4" }
  ]
}
```

### Loading Pattern

1. Fetch `./assets/story.canvas`
2. Parse all `"text"` nodes into Button objects
3. Parse `"group"` nodes as passive region overlays
4. Build adjacency: iterate edges, push `toNode` id into `fromNode.children[]` and `fromNode` id into `toNode.parents[]`
5. Sort children by `x` coordinate (left to right) for consistent `A`/`D` ordering
6. Identify start node: `id === "start"`, or first node if absent

---

## Implementation Notes

- **Vanilla JS only**, no frameworks
- **Desktop only** — no mobile/touch needed
- Font: **Nunito** (Google Fonts)
- Canvas is readonly — never write to `.canvas` files
- Prefer a CSS `transform`-based map layer over a raw `<canvas>` element — easier to style nodes as HTML and draw edges as SVG overlay
- Nodes as `<div>` elements, edges as `<svg>` layer on top, camera as CSS `transform: translate() scale()` on a wrapper div
- Keep code minimal and readable — split into logical sections with comments

---

## File Structure (suggested)

```
index.html          ← single file entry point
assets/
  story.canvas      ← the canvas data (readonly)
js/
  capitals.js       ← capitalize_substrings() and word list
  canvas.js         ← fetch + parse canvas into Button graph
  button.js         ← Button class, color mapping
  explorer.js       ← navigation state, history, fog of war
  renderer.js       ← DOM/SVG rendering, camera, animations
```

Or collapse everything into `index.html` if preferred for simplicity.