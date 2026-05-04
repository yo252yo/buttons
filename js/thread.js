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

  const btn = document.createElement('div');
  const color = btnData.color || "grey";
  btn.dataset.id = buttonName;
  btn.dataset.parent = parent.dataset.id;

  const existingBtn = document.querySelector(`[data-id="${buttonName}"]`);
  if (existingBtn) {
    btn.className = existingBtn.className;
    btn.innerHTML = existingBtn.innerHTML;
    existingBtn.remove();
  } else {
    btn.className = `button button-${color} unclicked_button`;
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


  document.querySelectorAll('.last_pressed').forEach(el => el.classList.remove('last_pressed'));
  this.classList.add('last_pressed');

  document.querySelectorAll('.chain_child').forEach(el => el.classList.remove('chain_child'));

  const children = getChildren(btnId);
  children.forEach(childId => {
    const btn = create_button(childId, this);
    if (btn) btn.classList.add('chain_child');
  });

  if (this.classList.contains('unclicked_button')) {
    this.classList.remove('unclicked_button');
    this.innerHTML = button_content(btnData, true);
  }
  this.classList.toggle('pressed');
}
