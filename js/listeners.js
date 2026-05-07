import { setupWindowBindings } from './api.js';
import { button_content, create_button, handle_press, press_dom_buttons } from './buttons_zone.js';
import { getButton, loadButtonsFromCanvas } from './canvas.js';
import { mb_display_page_div } from './interface.js';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';

function get_query_param(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const pageDiv = document.getElementById('page_div');

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

  const fullscreenBtn = document.getElementById('fullscreen_toggle');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', handle_fullscreen_toggle);
  }

  const startId = get_query_param('start') || 'start';

  const button_title = document.getElementById('title');
  button_title.innerHTML = button_content(getButton('title_button'));
  create_button(startId, button_title);
}

document.addEventListener('DOMContentLoaded', initial_load);

export function handle_fullscreen_toggle() {
  const btn = this;
  const isFullscreen = !!document.fullscreenElement;
  if (isFullscreen) {
    document.exitFullscreen();
    btn.classList.remove('pressed');
    btn.innerHTML = '<span class="btn-emoji">📱</span> Fullscreen OFF';
  } else {
    document.documentElement.requestFullscreen();
    btn.classList.add('pressed');
    btn.innerHTML = '<span class="btn-emoji">📱</span> Fullscreen ON';
  }
}

// Also expose globally for settings.js
window.handle_fullscreen_toggle = handle_fullscreen_toggle;