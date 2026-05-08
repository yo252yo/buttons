import { setupWindowBindings } from './api.js';
import { button_content } from './buttons.js';
import { create_button, handle_press, press_dom_buttons } from './buttons_zone.js';
import { getButton, loadButtonsFromCanvas } from './canvas.js';
import { InterfaceType, closePageDiv, executePageScript, interfaceButtonMeta as interfacePages, mb_display_page_div } from './interface.js';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light';

function get_query_param(name) {
  return new URLSearchParams(window.location.search).get(name);
}

export async function handle_interface_button_click() {
  const wasPressed = this.classList.contains('pressed');
  const page = interfacePages[this.textContent];

  document.querySelectorAll('.interface_button').forEach(btn => btn.classList.remove('pressed'));

  if (wasPressed) {
    closePageDiv();
    return;
  }

  this.classList.add('pressed');

  const type = page?.type || InterfaceType.PAGE;
  if (type === InterfaceType.ACTION) {
    closePageDiv();
    await executeActionPage(this.title);
  } else {
    await mb_display_page_div(this);
  }
}

async function executeActionPage(title) {
  try {
    await executePageScript(title);
  } finally {
    setTimeout(() => {
      const btn = document.querySelector(`.interface_button[title="${title}"]`);
      if (btn) btn.classList.remove('pressed');
    }, 600);
  }
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

function setupFullscreenButtons() {
  document.querySelectorAll('.fullscreen-btn').forEach(btn => {
    btn.addEventListener('click', handle_fullscreen_toggle);
  });
  update_fullscreen_buttons();
}

export function update_fullscreen_buttons() {
  const isFullscreen = !!document.fullscreenElement;
  const btns = document.querySelectorAll('.fullscreen-btn');
  btns.forEach(btn => {
    if (btn) {
      if (isFullscreen) {
        btn.classList.add('pressed');
        btn.innerHTML = '<span class="btn-emoji">📱</span> Fullscreen ON';
      } else {
        btn.classList.remove('pressed');
        btn.innerHTML = '<span class="btn-emoji">📱</span> Fullscreen OFF';
      }
    }
  });
}

document.addEventListener('fullscreenchange', update_fullscreen_buttons);

async function initial_load() {
  // Load buttons then setup window bindings with the cache
  const buttonsCache = await loadButtonsFromCanvas();
  setupWindowBindings(buttonsCache);

  document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', handle_buttonzone_button_click);
  });

  setupFullscreenButtons();

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

  document.getElementById('mobile-fullscreen-hint').style.display = 'none';
}

