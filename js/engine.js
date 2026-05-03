import { loadButtonsFromCanvas } from './canvas.js';
import { create_button, button_click_listener } from './thread.js';

function get_query_param(name) {
  return new URLSearchParams(window.location.search).get(name);
}

async function initial_load() {
  document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', button_click_listener);
    btn.addEventListener('touchstart', button_click_listener);
  });

  await loadButtonsFromCanvas();

  const startId = get_query_param('start') || 'start';
  create_button(startId);
}

document.addEventListener('DOMContentLoaded', initial_load);