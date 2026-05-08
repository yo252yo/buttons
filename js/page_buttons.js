import { button_content } from './buttons.js';
import { getButton } from './canvas.js';

export function expandablePageButtonHTML(btnData) {
  const color = btnData.color || 'grey';
  const content = button_content(btnData, false);
  return `<div class="button button-${color} expandable_page_button" data-expanded="false" data-title="${btnData.id}">${content}</div>`;
}

export function setupExpandablePageButtons(containerSelector = '#page_div') {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.querySelectorAll('.expandable_page_button').forEach(btn => {
    btn.addEventListener('click', () => {
      const btnId = btn.dataset.title;
      const btnData = getButton(btnId);
      const isExpanded = btn.dataset.expanded === 'true';
      btn.dataset.expanded = String(!isExpanded);
      btn.classList.toggle('pressed', !isExpanded);
      btn.innerHTML = button_content(btnData, !isExpanded);
    });
  });
}

export function purchaseButtonHTML(title, description, color = "green") {
  const isLocked = color === "blue" || color === "purple" || color === "orange";
  return `<div class="button button-${color} purchase_button${isLocked ? ' pressed' : ''}">` +
    `<h2>${title}</h2>` +
    `<div class="purchase_description">${description}</div>` +
    `</div>`;
}

export function setupPurchaseButtons(containerSelector = '#page_div') {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.querySelectorAll('.purchase_button:not(.pressed)').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('pressed');
    });
  });
}
