import { setupWindowBindings } from './api.js';
import { loadButtonsFromCanvas } from './canvas.js';
import { potentially_display_meta_button } from './interface.js';
import { button_click_listener, create_button } from './thread.js';

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

async function initial_load() {
  // Load buttons then setup window bindings with the cache
  const buttonsCache = await loadButtonsFromCanvas();
  setupWindowBindings(buttonsCache);

  document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', button_click_listener);
  });


  // Prevent wheel scroll when meta button is visible
  window.addEventListener('wheel', preventWheel, { passive: false });

  const startId = get_query_param('start') || 'start';
  create_button(startId);
}

document.addEventListener('DOMContentLoaded', initial_load);