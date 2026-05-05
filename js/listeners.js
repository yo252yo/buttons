import { setupWindowBindings } from './api.js';
import { loadButtonsFromCanvas } from './canvas.js';
import { button_click_listener, create_button } from './thread.js';

function get_query_param(name) {
  return new URLSearchParams(window.location.search).get(name);
}

let metaButton = document.getElementById('meta_button');

function preventWheel(e) {
  if (metaButton.style.display === 'block') {
    e.preventDefault();
  }
}

async function handle_interface_button_click() {
  const wasPressed = this.classList.contains('pressed');

  document.querySelectorAll('.interface_button').forEach(btn => btn.classList.remove('pressed'));

  if (wasPressed) {
    if (metaButton) metaButton.style.display = 'none';
    return;
  }

  this.classList.add('pressed');

  const title = this.title.toLowerCase();
  const jsPath = `pages/${title}.js`;

  try {
    const response = await fetch(jsPath);
    if (!response.ok) return;

    const jsCode = await response.text();

    // Prepare DOM first
    const colorClass = [...this.classList]
      .find(c => c.startsWith('button-') && c !== 'interface_button')
      ?.replace('button-', '') || 'grey';

    metaButton.className = `meta_button meta_button-${colorClass}`;
    metaButton.innerHTML = '';

    // Execute JS - JS can find metaButton via getElementById
    const fn = new Function(jsCode);
    const result = fn();
    if (result instanceof Promise) await result;

    metaButton.style.display = 'block';
  } catch (e) {
    console.log('No page file for:', title);
  }
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