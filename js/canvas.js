import { Button } from './button.js';

let buttonsCache = null;

export async function loadButtonsFromCanvas() {
  if (buttonsCache) return buttonsCache;

  const response = await fetch('./assets/story.canvas');
  const canvas = await response.json();

  buttonsCache = {};

  for (const node of canvas.nodes) {
    const id = node.id;
    buttonsCache[id] = Button.fromCanvasNode(node, []);
  }

  const nodePositions = {};
  for (const node of canvas.nodes) {
    nodePositions[node.id] = node.x || 0;
  }

  for (const edge of canvas.edges) {
    const from = edge.fromNode;
    const to = edge.toNode;
    if (from && to && buttonsCache[from]) {
      buttonsCache[from].children.push(to);
    }
  }

  // Sort children by x position of child nodes (left to right)
  for (const id in buttonsCache) {
    const btn = buttonsCache[id];
    if (btn.children.length > 0) {
      btn.children.sort((a, b) => -1 * (nodePositions[a] - nodePositions[b]));
    }
  }

  return buttonsCache;
}

export function getButton(id) {
  if (!buttonsCache) return null;
  return buttonsCache[id];
}