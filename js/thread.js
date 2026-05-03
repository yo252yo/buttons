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

  if (document.querySelector(`[data-id="${buttonName}"]`)) return;

  if (!parent) {
    parent = document.getElementById('title');
    if (!parent) return;
  }

  const btn = document.createElement('div');
  const color = btnData.color || "grey";
  btn.className = `button button-${color} unclicked_button`;
  btn.dataset.id = buttonName;

  btn.innerHTML = button_content(btnData, false);

  btn.addEventListener('click', button_click_listener);
  btn.addEventListener('touchstart', button_click_listener);

  const buttonsZone = document.getElementById('buttons_zone');
  if (buttonsZone) {
    buttonsZone.appendChild(btn);
  }

}

export function button_click_listener() {
  document.querySelectorAll('.last_pressed').forEach(el => el.classList.remove('last_pressed'));
  this.classList.add('last_pressed');

  this.classList.toggle('pressed');

  const btnId = this.dataset.id;
  const btnData = getButton(btnId);
  if (!btnData) return;

  if (this.classList.contains('unclicked_button')) {
    button_first_click(this, btnData);
  }
}

export function button_first_click(button, btnData) {
  button.innerHTML = button_content(btnData, true);
  button.classList.remove('unclicked_button');

  const buttonsZone = document.getElementById('buttons_zone');
  if (buttonsZone) {
    if (button.parent) {
      button.parent.remove(button);
    }
    buttonsZone.appendChild(button);
  }

  const children = getChildren(button.dataset.id);
  children.forEach(childId => {
    create_button(childId, button);
  });

  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}