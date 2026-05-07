const pageDiv = document.getElementById('page_div');

const greenFound = window.getGreenSpawnedCount?.() || 0;
// Hardcoded objective for the simplest path?
const greenTotal = 15;// window.getGreenTotalCount?.() || 0;
const flagsFound = window.getFlagsFound?.() || 0;

let pct = greenTotal > 0 ? Math.round((greenFound / greenTotal) * 100) : 0;
if (flagsFound > 0) {
  pct = 100;
} else {
  pct = Math.min(99, pct);
}

function purchase_button(title, description, color = "green") {
  let div_tag = "";
  if (color === "blue" || color === "purple") {
    div_tag = `<div class="button button-${color} purchase_button pressed">`;
  } else {
    div_tag = `<div class="button button-${color} purchase_button" onclick="this.classList.toggle('pressed')">`;
  }
  return div_tag + `
  <h2>${title}</h2>
  <div class="purchase_description">${description}
    <div id="purchase_${title.replace(' ', '_')}" style="font-variant-caps: small-caps; font-size: small; text-decoration: underline;">Chose PATH (WIP/TODO)</div>
  </div>
</div>`;
}
pageDiv.innerHTML = `
<div class="button button_path button-grey${(pct >= 100) ? ' pressed' : ''}">
  <h2>The Simplest PATH</h2>
  <div class="progress-track">
    <div class="progress-fill" style="width: ${pct}%;"></div>
    <span class="progress-pct">${pct}%</span>
  </div>
  <div>
    <span>${greenFound}</span>
    <span>GREEN 🟢 BUTTONs seen</span>
  </div>
  <div>
    <span>${flagsFound || "NO"}</span>
    <span>ENDing Flag 🏁 found</span>
  </div>
</div>
<hr>
<h1>You may chose 1 GREEN PATH (WIP/TODO)</h1>
${purchase_button("Simplest PATH II", "Follow the GREEN 🟢 line to the ENDing 🏁 flag.", "green")}
${purchase_button("GAM<span style='opacity:0.6'>BL</span>ER PATH", "Don't THINK.<br />Just THRILLs.", "green")}
${purchase_button("COLLECTOR PATH", "Chose one FOCUS.<br />Will you gather SONGs? FEATUREs? HUMANs?", "green")}
${purchase_button("MINER PATH", "Destroy BLOCKs.<br />Find GEMs.<br />PROFIT.", "green")}
${purchase_button("HUNTER PATH", "Track and uncover TREASUREs hidden deep in the GAME.", "green")}
${purchase_button("EXPLORER PATH", "Blaze all the TRAILs.<br />See all the SIGHTs.", "green")}

<hr>
<h1>Finish 1 GREEN PATH to unlock 1 BLUE PATH</h1>
${purchase_button("DETECTIVE PATH", "In this PLACE, to the METER,<br />At this TIME, to the HOUR,<br />Seal the LEAK, to the NAME.", "blue")}
${purchase_button("<span style='text-decoration: line-through'>PATH of FORTUNE</span>", "Just let your FATE guide you all the way through this maze,<br />And find your unique PATH leading to your TRUE SELF.<br />CUP House DLC", "blue")}
${purchase_button("<span style='text-decoration: line-through'>CENSOR PATH</span>", "Hunt for specific words, DEPLATFORM them out of existence with your new DEPLATFORM CURSOR.<br />Comes with a Pixel Hunter path (by letter/syllables), Mathematician path (works on numbers) and all kind of targets to DEPLATFORM.<br />PENTACLE House DLC", "blue")}
${purchase_button("<span style='text-decoration: line-through'>COLORed PATH</span>", "Seek the patterns behind the TRUTH.<br />COLOR is ALL that MATTERs.<br />You will be rewarded for specific color patterns in the buttons ordering.<br />SWORD House DLC", "blue")}

<hr>
<h1>Finish 1 BLUE PATH to unlock 1 PURPLE PATH</h1>

<hr>
<h1>Finish 1 PURPLE PATH to unlock 1 ORANGE PATH</h1>
${purchase_button("<span style='text-decoration: line-through'>HACKER PATH</span>", "If you can find the SECRET way through the CODE, you will find new tools to SHED LIGHT and MAP the world.<br />WAND House DLC", "purple")}
`;