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

  const emojis = Object.keys(emojiCounts).sort();

  const colorEmoji = { grey: '⚫', green: '🟢', blue: '🔵', purple: '🟣', orange: '🟠' };

  let html = '<table border="1" style="border-collapse: collapse; text-align: center;">';
  html += '<tr><th></th>' + colors.map(c => `<th style="background:${colorBg[c]};padding:5px;">${colorEmoji[c]}</th>`).join('') + '</tr>';

  for (let i = 0; i < emojis.length; i++) {
    const e = emojis[i];
    const rowBg = i % 2 === 0 ? colorBg : colorBgDark;
    html += `<tr><td>${e}</td>`;
    for (const c of colors) {
      html += `<td style="background:${rowBg[c]};">${emojiCounts[e][c] || ''}</td>`;
    }
    html += '</tr>';
  }
  html += '</table>';

  metaButton.innerHTML = html;
})();