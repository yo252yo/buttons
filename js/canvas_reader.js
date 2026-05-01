import { Button } from './button.js';

let buttonsCache = null;

export async function loadButtonsFromCanvas() {
  if (buttonsCache) return buttonsCache;

  const response = await fetch('./js/story.canvas');
  const canvas = await response.json();

  buttonsCache = {};

  for (const node of canvas.nodes) {
    const id = node.id;
    buttonsCache[id] = Button.fromCanvasNode(node, []);
  }

  for (const edge of canvas.edges) {
    const from = edge.fromNode;
    const to = edge.toNode;
    if (from && to && buttonsCache[from]) {
      buttonsCache[from].children.push(to);
    }
  }

  return buttonsCache;
}

export function getButton(id) {
  if (!buttonsCache) return null;
  return buttonsCache[id];
}

export function getChildren(id) {
  const btn = getButton(id);
  return btn ? btn.children : [];
}