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

  for (const edge of canvas.edges) {
    const from = edge.fromNode;
    const to = edge.toNode;
    if (from && to && buttonsCache[from]) {
      buttonsCache[from].children.push(to);
    }
  }

  // Sort children by x position (left to right)
  for (const id in buttonsCache) {
    const btn = buttonsCache[id];
    if (btn.children.length > 0) {
      btn.children.sort((a, b) => (buttonsCache[b]?.x || 0) - (buttonsCache[a]?.x || 0));
    }
  }

  return buttonsCache;
}

export function getButton(id) {
  if (!buttonsCache) return null;
  return buttonsCache[id];
}


function sortByY(buttons) {
  return [...buttons].sort((a, b) => a.y - b.y);
}

export function getButtonsByEmoji(emoji) {
  return sortByY(Object.values(buttonsCache).filter(b => b.emoji === emoji));
}