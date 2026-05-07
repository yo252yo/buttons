import { handle_interface_button_click } from './listeners.js';

export const InterfaceType = {
  PAGE: 'page',
  ACTION: 'action',
  TOOLBAR: 'toolbar',
};

export const interfaceButtonMeta = {
  '🏆': { title: 'Objectives', color: 'green' },
  '❓': { title: 'Help', color: 'grey' },

  '⚙️': { title: 'Settings', color: 'grey' },
  '🎵': { title: 'Audio', color: 'grey' },

  '🗑️': { title: 'Archive', color: 'blue', type: 'action' },

  '☺️': { title: 'debug', color: 'orange' },


  //  '⭐': { title: 'STARters', color: 'grey' },
  // '🧵': { title: 'Threads', color: 'grey' },
  // '🎨': { title: 'Progress', color: 'blue' },
  // '👥': { title: 'Characters', color: 'purple' },
  // '📍': { title: 'Locations', color: 'purple' },
  // '⏰': { title: 'Times', color: 'grey' },
  // '🏆': { title: 'Quests', color: 'grey' },
  // '💾': { title: 'Disk', color: 'grey' },
  // '🐟': { title: 'Catches', color: 'grey' },
};

export function mb_create_interface_button(emoji) {
  const meta = interfaceButtonMeta[emoji];
  if (!meta) return;

  const interfaceDiv = document.getElementById('interface');
  const existingBtn = interfaceDiv.querySelector(`.interface_button[title="${meta.title}"]`);
  if (existingBtn) return;

  const btn = document.createElement('div');
  btn.className = `interface_button last_pressed button-${meta.color}`;
  btn.title = meta.title;
  btn.textContent = emoji;
  btn.addEventListener('click', handle_interface_button_click);

  const margin = document.getElementById('margin_interface');
  if (margin && margin.nextSibling) {
    interfaceDiv.insertBefore(btn, margin.nextSibling);
  } else {
    interfaceDiv.appendChild(btn);
  }
}

export function closePageDiv() {
  const pageDiv = document.getElementById('page_div');
  if (pageDiv) pageDiv.style.display = 'none';
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

export function openPageDiv() {
  const pageDiv = document.getElementById('page_div');
  if (pageDiv) {
    pageDiv.style.display = 'block';
    pageDiv.scrollTop = 0;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
}

export async function executePageScript(title) {
  const jsPath = `pages/${title.toLowerCase()}.js`;
  const response = await fetch(jsPath);
  if (!response.ok) return null;
  const jsCode = await response.text();
  const fn = new Function(jsCode);
  const result = fn();
  return result instanceof Promise ? await result : result;
}

export async function mb_display_page_div(button) {
  const title = button.title;

  const colorClass = [...button.classList]
    .find(c => c.startsWith('button-') && c !== 'interface_button')
    ?.replace('button-', '') || 'grey';

  try {
    await executePageScript(title);
    const pageDiv = document.getElementById('page_div');
    pageDiv.className = `page page-${colorClass}`;
    openPageDiv();
  } catch (e) {
    console.log('No valid page file for:', title, e);
  }
}
