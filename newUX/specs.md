# Buttons Story Canvas Viewer — Specification

## Overview
Interactive canvas viewer for a story canvas with keyboard navigation, fog-of-war exploration, and animated node transitions.

## Canvas Structure
- **429 nodes** with edges forming a branching narrative
- Starting node: `title_button`
- Traversal: keyboard-driven (A/D to select, Enter to travel)
- Pan/zoom via mouse drag and scroll wheel

## Core Features

### Navigation
- **A/D keys**: cycle through visible neighbors of current node
  - D = clockwise from 9 o'clock (next clockwise neighbor)
  - A = counterclockwise (previous neighbor)
- **Enter**: travel to selected neighbor
- **Arrow keys**: alternative to A/D
- **Mouse drag**: pan the canvas
- **Scroll wheel**: zoom in/out (min 0.1x, max 2.5x)
- **Touch**: pan (1 finger) and pinch-zoom (2 fingers)

### Fog of War
- Only **visited nodes + children of current node** are revealed
- Unvisited nodes: show title only (no full content expansion)
- `visited` Set: nodes user has traveled to
- `revealed` Set: nodes visible on canvas (visited + children + revealed parents)

### Camera Animation (Lerp)
- All position changes animate with slow lerp (factor **0.08**)
- Camera focus point lerps separately (factor **0.05** for slower scroll)
- Zoom lerps at 0.08 factor
- `startAnim()` runs requestAnimationFrame loop until all motion stops

## Visual Design

### Node Appearance
- Solid color background with black text
- Max width capped at **600px**
- `<h1>` tags rendered as **18px bold**
- All other HTML stripped from display text
- Title extracted as first line before `\n---\n`

### Edges
- Simple lines, **5px wide**
- Thicker (7px) for active path (current → selected)
- Opacity by state:
  - Selected: **0.5**
  - Connected (neighbors): **0.25**
  - Explored (visited): **0.4**
  - Hidden (unexplored): **0.06**

### Zoom Behavior
- **Default: 2.5x**
- **Min: 0.1x, Max: 2.5x**
- Auto zoom-out from default when node has **>4 children**: `2.5 / (count / 4)`
- Zoom guard: `Math.abs(camScale - 2.5) < 0.01` prevents auto-zoom if user modified zoom

## Smooth Transition (3-Phase)

When traveling from A → B:

### Phase 1+2: Canvas Shift
- Compute `offset = dest.ox - dest.x` (how far B has drifted from original)
- All nodes shift by offset:
  - A and B: `tx = x + offsetX, ty = y + offsetY` (stay on screen)
  - Rest: `tx = ox + offsetX, ty = oy + offsetY` (reset to original + offset)
- Camera also shifts: `focusTargetX += offsetX, focusTargetY += offsetY`
- Effect: A and B appear stationary on screen while world shifts around them

### Phase 3a: Camera Scroll
- Camera centers on B's current position (`ccx = dest.tx + nw/2`)
- `focusTargetX = ccx, focusTargetY = ccy`
- Camera position updates immediately: `camX = W/2 - ccx*camScale`

### Phase 3c: Grid Layout
- B's neighbors (children + visited parents) laid out in grid
- Grid centered on B's current position (using `dest.ty` not `dest.y`)
- Above region: `vL` to `vR` horizontally, `vT` to `dest.ty` vertically
- Below region: `vL` to `vR` horizontally, `dest.ty+nh` to `vT+viewH-2*margin` vertically
- `layoutGrid(nodes, left, top, right, bottom)`: fills grid within bounds

### A Exclusion Rule
- If A is the **only node** in the above region (above group size = 1), A is **excluded** from grid
- A stays at its highlight position outside the grid
- Prevents A from being absorbed into B's neighbor grid when it's the sole parent

## State Variables

```
let camX = 0, camY = 0, camScale = 2.5;
let focusX = 0, focusY = 0, focusTargetX = 0, focusTargetY = 0, targetCamScale = 2.5;
let currentId = 'title_button';
let selectedIdx = 0;
let visited = new Set();
let revealed = new Set();
```

## Key Functions

### `travelTo(id, snap)`
Main navigation function:
1. Mark `id` as visited
2. Clear all `clusterW` cached widths
3. Phase 1+2: canvas shift (if transitioning)
4. Compute dest node size for grid centering
5. Gather neighbors (children + visited parents) into above/below Sets
6. A exclusion if alone above
7. Phase 3a: camera scroll to B
8. Phase 3c: grid layout for neighbors
9. Zoom refinement (if at default zoom)
10. Set `currentId = id`, `selectedIdx = 0`
11. Call `startAnim()` or snap

### `startAnim()`
Animation loop:
1. Lerp all node positions toward `tx/ty` at 0.08 factor
2. Lerp focus toward `focusTarget` at 0.05 factor
3. Lerp camScale toward `targetCamScale` at 0.08 factor
4. Update camX/camY from focus and scale
5. Draw frame
6. Continue until all motion stops

### `visibleNeighbors(id)`
Returns neighbors visible from current node:
- All edges from current node (children)
- All edges to current node from visited nodes (parents)
- Filtered by fog of war rules

### `layoutGrid(nodes, left, top, right, bottom)`
Places nodes in grid within bounds:
- 2 columns for up to 6 nodes, else auto columns
- Fills row-by-row left-to-right
- Nodes don't overlap (x sorted by original position)
- Respects left/right/top/bottom boundaries

## Current Known Issues

1. **Canvas shift can warp the view**: When B has drifted significantly from its original position, the offset calculation causes dramatic shifts. The "correct" approach (offset = dest.ox - dest.x) produces offX = -2458 for the start→create_character transition, which shifts all nodes massively.

2. **Transition feels abrupt despite lerp**: The Phase 1+2 canvas shift happens in a single frame (immediate), then nodes lerp to their positions. The initial jump is visible.

3. **A exclusion edge case**: When A has siblings in the above group, it's included in the grid normally. But when A is alone above, it stays as a highlight. This works correctly but the visual result can be confusing.

## File Location
`/home/yoann/ian/web_servers/buttons/index.html`

## TODO (Next Session)

### Critical Fixes
1. **Debug the canvas shift**: Verify the offset computation produces expected behavior
2. **Smooth out the camera scroll**: Focus should lerp more smoothly, perhaps at 0.03-0.05 factor
3. **Verify node positions after transition**: title_button and start should end up at expected positions

### Polish
1. Add transition confirmation (screen flash or visual cue)
2. Consider disabling auto-zoom entirely for more predictable navigation
3. Test deep navigation chains (3+ hops) to verify stability

### If Starting Over
Consider a simpler model: on travel, reset ALL nodes to original, place A and B at their grid positions, then lerp. The current 3-phase model is complex and hard to debug visually.