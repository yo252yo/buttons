import { setupWindowBindings } from './api.js';
import { button_content, create_button, handle_press, press_dom_buttons } from './buttons_zone.js';
import { getButton, loadButtonsFromCanvas } from './canvas.js';
import { mb_display_page_div } from './interface.js';

function get_query_param(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const pageDiv = document.getElementById('page_div');

function preventWheel(e) {
  if (pageDiv.style.display === 'block') {
    e.preventDefault();
  }
}

export async function handle_interface_button_click() {
  const wasPressed = this.classList.contains('pressed');

  document.querySelectorAll('.interface_button').forEach(btn => btn.classList.remove('pressed'));

  if (wasPressed) {
    if (pageDiv) pageDiv.style.display = 'none';
    return;
  }

  this.classList.add('pressed');

  await mb_display_page_div(this);
}

export function handle_buttonzone_button_click() {
  const btnId = this.dataset.id;
  const btnData = getButton(btnId);

  press_dom_buttons(this, btnId);

  if (!btnData) {
    console.log("Button clicked not in the loaded canvas:" + btnId);
    return;
  }

  handle_press(this, btnId, btnData);
}

async function initial_load() {
  // Load buttons then setup window bindings with the cache
  const buttonsCache = await loadButtonsFromCanvas();
  setupWindowBindings(buttonsCache);

  document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', handle_buttonzone_button_click);
  });


  // Prevent wheel scroll when meta button is visible
  window.addEventListener('wheel', preventWheel, { passive: false });

  const startId = get_query_param('start') || 'start';

  const button_title = document.getElementById('title');
  button_title.innerHTML = button_content(getButton('title_button'));
  create_button(startId, button_title);
}

document.addEventListener('DOMContentLoaded', initial_load);