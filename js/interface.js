
import { handle_interface_button_click } from './listeners.js';

const interfaceButtonMeta = {
  '⚙️': { title: 'Settings', color: 'grey' },
  '🎵': { title: 'Audio', color: 'grey' },
  '⭐': { title: 'STARters', color: 'grey' },
  '🏆': { title: 'Objectives', color: 'green' },
  '☺️': { title: 'debug', color: 'blue' },


  // '🧵': { title: 'Threads', color: 'grey' },
  // '🎨': { title: 'Progress', color: 'blue' },
  // '🗑️': { title: 'Archive', color: 'orange' },
  // '👥': { title: 'Characters', color: 'purple' },
  // '📍': { title: 'Locations', color: 'purple' },
  // '⏰': { title: 'Times', color: 'grey' },
  // '🏆': { title: 'Quests', color: 'grey' },
  // '💾': { title: 'Disk', color: 'grey' },
  // '🐟': { title: 'Catches', color: 'grey' },
  // '❓': { title: 'Help', color: 'grey' },
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

export async function mb_display_page_div(button) {
  const title = button.title;

  const jsPath = `pages/${title.toLowerCase()}.js`;

  try {
    const response = await fetch(jsPath);
    if (!response.ok) return;

    // Prepare DOM first
    const colorClass = [...button.classList]
      .find(c => c.startsWith('button-') && c !== 'interface_button')
      ?.replace('button-', '') || 'grey';

    const jsCode = await response.text();

    const pageDiv = document.getElementById('page_div');
    pageDiv.className = `page page-${colorClass}`;
    pageDiv.innerHTML = '';

    // Execute JS - JS can find metaButton via getElementById
    const fn = new Function(jsCode);
    const result = fn();
    if (result instanceof Promise) await result;

    pageDiv.style.display = 'block';
  } catch (e) {
    console.log('No valid page file for:', title, e);
  }
}
