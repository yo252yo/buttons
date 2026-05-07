import { getButton } from './canvas.js';

export function button_content(btnData, expanded) {
  if (expanded) {
    return `<b><span class="btn-emoji">${btnData.emoji || ''}</span> ${btnData.title}</b>${btnData.content || ''}`;
  }
  return `<b><span class="btn-emoji">${btnData.emoji || ''}</span> ${btnData.title}</b>`;
}

export function getChildren(id) {
  const btn = getButton(id);
  return btn ? btn.children : [];
}
