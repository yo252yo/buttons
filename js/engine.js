import { loadButtonsFromCanvas } from './canvas.js';
import { create_button, button_click_listener } from './thread.js';

function get_query_param(name) {
  return new URLSearchParams(window.location.search).get(name);
}

let metaButton = document.getElementById('meta_button');

async function handle_interface_button_click() {
  const wasPressed = this.classList.contains('pressed');

  document.querySelectorAll('.interface_button').forEach(btn => btn.classList.remove('pressed'));

  if (wasPressed) {
    if (metaButton) metaButton.style.display = 'none';
    return;
  }

  this.classList.add('pressed');

  const colorClass = [...this.classList]
    .find(c => c.startsWith('button-') && c !== 'interface_button')
    ?.replace('button-', '') || 'grey';

  const title = this.title.toLowerCase();
  const metaPath = `meta_buttons/${title}.html`;

  try {
    const response = await fetch(metaPath);
    if (!response.ok) return;

    const html = await response.text();
    if (!html.trim()) return;

    metaButton.className = `meta_button meta_button-${colorClass}`;
    metaButton.innerHTML = html;
    metaButton.style.display = 'block';
  } catch (e) {
    console.log('No meta_button file for:', title);
  }
}

async function initial_load() {
  document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', button_click_listener);
    btn.addEventListener('touchstart', button_click_listener);
  });

  document.querySelectorAll('.interface_button').forEach(btn => {
    btn.addEventListener('click', handle_interface_button_click);
  });

  await loadButtonsFromCanvas();

  const startId = get_query_param('start') || 'start';
  create_button(startId);
}

document.addEventListener('DOMContentLoaded', initial_load);