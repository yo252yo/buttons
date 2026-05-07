import { getPressedButtons, getSpawnedButtons } from './buttons_zone.js';
import { getButtonsByEmoji } from './canvas.js';
import { handle_fullscreen_toggle, update_fullscreen_buttons } from './listeners.js';
import { expandablePageButtonHTML, setupExpandablePageButtons, purchaseButtonHTML, setupPurchaseButtons } from './page_buttons.js';
import { closePageDiv } from './interface.js';

export function setupWindowBindings(buttonsCache) {
  window.getEmojiCount = () => {
    const colors = ['grey', 'green', 'blue', 'purple', 'orange'];

    const emojiCounts = {};
    for (const btn of Object.values(buttonsCache)) {
      const e = btn.emoji || '∅';
      if (!emojiCounts[e]) emojiCounts[e] = {};
      emojiCounts[e][btn.color] = (emojiCounts[e][btn.color] || 0) + 1;
    }

    const emojis = Object.keys(emojiCounts).sort();
    return { emojiCounts, colors, emojis };
  };

  window.getButtonCount = () => Object.keys(buttonsCache).length;

  // Count spawned green buttons (check buttonsCache for color)
  window.getGreenSpawnedCount = () => getSpawnedButtons().filter(id => {
    const btn = buttonsCache[id];
    return btn && btn.color === 'green';
  }).length;

  window.getGreenTotalCount = () => Object.values(buttonsCache).filter(b => b.color === 'green').length;

  window.getFlagsFound = () => {
    const pressed = getPressedButtons();
    return Object.keys(pressed).filter(id => {
      const btn = buttonsCache[id];
      return btn && btn.emoji === '🏁' && pressed[id];
    }).length;
  };

  window.getButtonsByEmoji = getButtonsByEmoji;

  window.handle_fullscreen_toggle = handle_fullscreen_toggle;
  window.update_fullscreen_buttons = update_fullscreen_buttons;

  window.expandablePageButtonHTML = expandablePageButtonHTML;
  window.setupExpandablePageButtons = setupExpandablePageButtons;
  window.purchaseButtonHTML = purchaseButtonHTML;
  window.setupPurchaseButtons = setupPurchaseButtons;
  window.closePageDiv = closePageDiv;
}