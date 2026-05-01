import { BUTTONS, capitalized_substrings } from './story.js';

function capitalize_substrings(text) {
  if (!text || !capitalized_substrings) return text;
  let result = text;
  for (const substr of capitalized_substrings) {
    const regex = new RegExp(substr, 'gi');
    result = result.replace(regex, substr);
  }
  return result;
}

function button_html(btnData, expanded) {
  let html;
  if (expanded) {
    html = `<b>${btnData.emoji || ''} ${btnData.title}</b><br/>${btnData.content || ''}`;
  } else {
    html = `<b>${btnData.emoji || ''} ${btnData.title}</b>`;
  }
  return capitalize_substrings(html);
}

function create_button(buttonName, parent) {
  const btnData = BUTTONS[buttonName];
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

  btn.innerHTML = button_html(btnData, false);

  btn.addEventListener('click', button_click_listener);
  btn.addEventListener('touchstart', button_click_listener);

  // parent.parentNode.insertBefore(btn, parent.nextSibling); // TODO: make this an option later
  // btn.scrollIntoView({ behavior: 'smooth', block: 'end' });

  const buttonsZone = document.getElementById('buttons_zone');
  if (buttonsZone) {
    buttonsZone.appendChild(btn);
  }

}

function button_click_listener() {
  this.classList.toggle('pressed');

  const btnId = this.dataset.id;
  const btnData = BUTTONS[btnId];
  if (!btnData) return;

  if (this.classList.contains('unclicked_button')) {
    expand_button(this, btnData);
  }
}

function expand_button(button, btnData) {
  button.innerHTML = button_html(btnData, true);
  button.classList.remove('unclicked_button');

  const buttonsZone = document.getElementById('buttons_zone');
  if (buttonsZone) {
    if (button.parent) {
      button.parent.remove(button);
    }
    buttonsZone.appendChild(button);
  }

  if (btnData && btnData.children) {
    btnData.children.forEach(childId => {
      create_button(childId, button);
    });
  }

  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function initial_load() {
  document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', button_click_listener);
    btn.addEventListener('touchstart', button_click_listener);
  });

  create_button("start");
}

document.addEventListener('DOMContentLoaded', initial_load);