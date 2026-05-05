(async () => {
  const metaButton = document.getElementById('meta_button');
  const { emojiCounts, colors } = window.getEmojiCount();

  const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const colorBg = {
    grey: getCssVar('--grey'),
    green: getCssVar('--green'),
    blue: getCssVar('--blue'),
    purple: getCssVar('--purple'),
    orange: getCssVar('--orange')
  };
  const colorBgDark = {
    grey: getCssVar('--grey-border'),
    green: getCssVar('--green-border'),
    blue: getCssVar('--blue-border'),
    purple: getCssVar('--purple-border'),
    orange: getCssVar('--orange-border')
  };

  // Calculate totals and sort by total descending
  const emojisWithTotals = Object.entries(emojiCounts).map(([emoji, counts]) => {
    let total = 0;
    for (const c of colors) {
      total += counts[c] || 0;
    }
    return { emoji, counts, total };
  });
  emojisWithTotals.sort((a, b) => b.total - a.total);

  const colorEmoji = { grey: '⚫', green: '🟢', blue: '🔵', purple: '🟣', orange: '🟠' };

  // Transposed: colors as rows, emojis as columns
  let html = '<table border="1" style="border-collapse: collapse; text-align: center;">';

  // Column headers: emoji, Total, then each emoji (sorted by total)
  html += '<tr><th></th><th>Total</th>' + emojisWithTotals.map(e => `<th>${e.emoji}</th>`).join('') + '</tr>';

  // Row 1: totals for each emoji
  html += '<tr><td><b>Total</b></td>';
  html += `<td><b>${emojisWithTotals.reduce((sum, e) => sum + e.total, 0)}</b></td>`;
  for (const e of emojisWithTotals) {
    html += `<td><b>${e.total}</b></td>`;
  }
  html += '</tr>';

  // Color rows: grey, green, blue, purple, orange
  for (let rowIdx = 0; rowIdx < colors.length; rowIdx++) {
    const c = colors[rowIdx];
    const rowBg = rowIdx % 2 === 0 ? colorBg : colorBgDark;
    html += `<tr><td style="background:${colorBg[c]};padding:5px;">${colorEmoji[c]}</td>`;
    // Sum for this color across all emojis
    html += `<td>${emojisWithTotals.reduce((sum, e) => sum + (e.counts[c] || 0), 0)}</td>`;
    // Count for each emoji in this color
    for (const e of emojisWithTotals) {
      html += `<td style="background:${rowBg[c]};">${e.counts[c] || ''}</td>`;
    }
    html += '</tr>';
  }

  html += '</table>';
  metaButton.innerHTML = html;
})();