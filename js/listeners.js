import { setupWindowBindings } from './api.js';
import { getButton, loadButtonsFromCanvas } from './canvas.js';
import { potentially_display_meta_button } from './interface.js';
import { create_button, handle_first_press, highlight_last_pressed, press_dom_buttons } from './buttons_zone.js';

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

  await potentially_display_meta_button(this);
}

export function handle_buttonzone_button_click() {
  const btnId = this.dataset.id;
  const btnData = getButton(btnId);

  press_dom_buttons(this, btnId);

  if (!btnData) {
    console.log("Button clicked not in the loaded canvas:" + btnId);
    return;
  }

  handle_first_press(this, btnId, btnData);
  highlight_last_pressed(btnId);
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
  create_button(startId);
}

document.addEventListener('DOMContentLoaded', initial_load);