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

const html = `
<div class="button button-grey${(pct >= 100) ? ' pressed' : ''}">
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
`;
pageDiv.innerHTML = html;