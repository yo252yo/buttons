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

  let html = '<table border="1" style="border-collapse: collapse; text-align: center;">';
  html += '<tr><th></th><th>Total</th>' + colors.map(c => `<th style="background:${colorBg[c]};padding:5px;">${colorEmoji[c]}</th>`).join('') + '</tr>';

  for (let i = 0; i < emojisWithTotals.length; i++) {
    const { emoji, counts, total } = emojisWithTotals[i];
    const rowBg = i % 2 === 0 ? colorBg : colorBgDark;
    html += `<tr><td>${emoji}</td><td><b>${total}</b></td>`;
    for (const c of colors) {
      html += `<td style="background:${rowBg[c]};">${counts[c] || ''}</td>`;
    }
    html += '</tr>';
  }
  html += '</table>';

  metaButton.innerHTML = html;
})();