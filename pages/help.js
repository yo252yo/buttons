const pageDiv = document.getElementById('page_div');

const helpButtons = window.getButtonsByEmoji?.('❓') || [];
let html = '<h1>Help</h1>';
helpButtons.forEach(btn => {
  html += window.expandablePageButtonHTML(btn);
});
pageDiv.innerHTML = html;

window.setupExpandablePageButtons();
