import { getButton, getChildren } from './canvas.js';
import { capitalize_substrings } from './objectives.js';

export function button_content(btnData, expanded) {
  let html;
  if (expanded) {
    html = `<b>${btnData.emoji || ''} ${btnData.title}</b>${btnData.content || ''}`;
  } else {
    html = `<b>${btnData.emoji || ''} ${btnData.title}</b>`;
  }
  return capitalize_substrings(html);
}

export function applyButtonState(btn, sourceBtn, btnData) {
  if (sourceBtn) {
    btn.className = sourceBtn.className;
    btn.innerHTML = sourceBtn.innerHTML;
  } else {
    btn.className = `button button-${btnData.color || "grey"} unclicked_button`;
    btn.innerHTML = button_content(btnData, false);
  }
}

export function create_button(buttonName, parent) {
  const btnData = getButton(buttonName);
  if (!btnData) return;

  if (!parent) {
    parent = document.getElementById('title');
    if (!parent) return;
  }

  const existingBtn = document.querySelector(`[data-id="${buttonName}"]`);

  const btn = document.createElement('div');
  btn.dataset.id = buttonName;
  btn.dataset.parent = parent.dataset.id;

  if (existingBtn) {
    // Preserve state by copying className and innerHTML
    btn.className = existingBtn.className;
    btn.innerHTML = existingBtn.innerHTML;
  } else {
    btn.className = `button button-${btnData.color || 'grey'} unclicked_button`;
    btn.innerHTML = button_content(btnData, false);
  }

  btn.addEventListener('click', button_click_listener);
  btn.addEventListener('touchstart', button_click_listener);

  const buttonsZone = document.getElementById('buttons_zone');
  if (buttonsZone) {
    if (parent && parent.nextSibling) {
      buttonsZone.insertBefore(btn, parent.nextSibling);
    } else {
      buttonsZone.appendChild(btn);
    }
  }

  return btn;
}

export function button_click_listener() {
  const btnId = this.dataset.id;
  const btnData = getButton(btnId);
  if (!btnData) return;

  // First click - create children (spawning)
  if (this.classList.contains('unclicked_button')) {
    this.classList.remove('unclicked_button');
    this.innerHTML = button_content(btnData, true);

    const children = getChildren(btnId);
    children.forEach(childId => {
      create_button(childId, this);
    });
  }

  highlight_last_pressed(this);
  change_button_state(this, btnId, btnData);
}

export function change_button_state(button, btnId, btnData) {
  button.classList.toggle('pressed');

  // Propagate through the DOM
  document.querySelectorAll(`[data-id="${btnId}"]`).forEach(btn => {
    applyButtonState(btn, button, btnData);
  });
}

export function highlight_last_pressed(dom_button) {
  document.querySelectorAll('.last_pressed').forEach(el => el.classList.remove('last_pressed'));
  dom_button.classList.add('last_pressed');

  // Then highlight its children
  document.querySelectorAll('.last_children').forEach(el => el.classList.remove('last_children'));
  const children = getChildren(dom_button.dataset.id);
  children.forEach(childId => {
    const childBtn = document.querySelector(`[data-id="${childId}"]`);
    if (childBtn) childBtn.classList.add('last_children');
  });
}