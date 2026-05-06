(async () => {
  const pageDiv = document.getElementById('page_div');
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

  const black = getCssVar('--black');

  // Transposed: colors as rows, emojis as columns - Total at the end (inverted from before)
  let html = 'TBC WIP your first objective is to find an ending flag 🏁 > more objectives/tracking/etc...<table style="border-collapse: collapse; text-align: center; border-left: 2px solid ' + black + '; border-right: 2px solid ' + black + ';">';

  // Column headers: emoji, then each emoji (sorted by total), then Total at end
  html += '<tr><th></th>';
  for (const e of emojisWithTotals) {
    html += '<th style="border-left: 1px solid ' + black + ';">' + e.emoji + '</th>';
  }
  html += '<th style="border-left: 1px solid ' + black + ';">Total</th></tr>';

  // Row 1: totals for each emoji
  html += '<tr><td><b>Total</b></td>';
  for (const e of emojisWithTotals) {
    html += '<td style="border-left: 1px solid ' + black + ';"><b>' + e.total + '</b></td>';
  }
  html += '<td style="border-left: 1px solid ' + black + ';"><b>' + emojisWithTotals.reduce((sum, e) => sum + e.total, 0) + '</b></td>';
  html += '</tr>';

  // Color rows: grey, green, blue, purple, orange
  for (let rowIdx = 0; rowIdx < colors.length; rowIdx++) {
    const c = colors[rowIdx];
    const rowBg = rowIdx % 2 === 0 ? colorBg : colorBgDark;
    html += '<tr><td style="background:' + colorBg[c] + ';padding:5px;">' + colorEmoji[c] + '</td>';
    // Count for each emoji in this color
    for (const e of emojisWithTotals) {
      html += '<td style="border-left: 1px solid ' + black + '; background:' + rowBg[c] + ';">' + (e.counts[c] || '') + '</td>';
    }
    // Sum for this color across all emojis
    html += '<td style="border-left: 1px solid ' + black + ';">' + emojisWithTotals.reduce((sum, e) => sum + (e.counts[c] || 0), 0) + '</td>';
    html += '</tr>';
  }

  html += '</table>';
  pageDiv.innerHTML = html;
})();