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
    btn.className = `button button-${btnData.color || 'grey'} unclicked_button last_children`;
    btn.innerHTML = button_content(btnData, false);
  }

  btn.addEventListener('click', button_click_listener);

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

  if (!btnData) {
    console.log("Button clicked not in the loaded canvas:" + btnId);
  }
  else if (this.classList.contains('unclicked_button')) {

    // First canvas click - create children (spawning)
    this.classList.remove('unclicked_button');
    this.innerHTML = button_content(btnData, true);

    getChildren(btnId).forEach(childId => {
      create_button(childId, this);
    });
  }

  // commit changes to button dom
  write_to_dom(this, btnId);

  // finally highlight the last action
  highlight_last_pressed(btnId);
}

export function write_to_dom(dom_btn, btnId) {
  dom_btn.classList.toggle('pressed');

  // Propagate through the DOM
  document.querySelectorAll(`[data-id="${btnId}"]`).forEach(dom_btn_ => {
    dom_btn_.classList = dom_btn.classList;
    dom_btn_.innerHTML = dom_btn.innerHTML;
  });
}

export function highlight_last_pressed(btnId) {
  // Handle second_to_last_pressed
  document.querySelectorAll('.second_to_last_pressed').forEach(el => el.classList.remove('second_to_last_pressed'));
  const prevLastPressed = document.querySelectorAll('.last_pressed');
  prevLastPressed.forEach(el => {
    el.classList.add('second_to_last_pressed');
  });

  // Remove all last_pressed in DOM, then add to all buttons with same id
  document.querySelectorAll('.last_pressed').forEach(el => el.classList.remove('last_pressed'));
  document.querySelectorAll(`[data-id="${btnId}"]`).forEach(el => el.classList.add('last_pressed'));

  // Handle second_to_last_children
  document.querySelectorAll('.second_to_last_children').forEach(el => el.classList.remove('second_to_last_children'));
  const prevLastChildren = document.querySelectorAll('.last_children');
  prevLastChildren.forEach(el => {
    el.classList.add('second_to_last_children');
  });

  // Remove all last_children in DOM, then add to children
  document.querySelectorAll('.last_children').forEach(el => el.classList.remove('last_children'));
  const children = getChildren(btnId);
  children.forEach(childId => {
    document.querySelectorAll(`[data-id="${childId}"]`).forEach(childBtn => {
      childBtn.classList.add('last_children');
    });
  });
}