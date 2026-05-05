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
}