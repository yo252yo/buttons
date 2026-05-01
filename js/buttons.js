function button_html(btnData, expanded) {
  if (expanded) {
    return `<b>${btnData.emoji || ''} - ${btnData.title}</b><br/>${btnData.content || ''}`;
  }
  return `<b>${btnData.emoji || ''} - ${btnData.title}</b>`;
}

function create_button(buttonName, parent) {
  const btnData = BUTTONS[buttonName];
  if (!btnData) return;

  if (document.querySelector(`[data-id="${buttonName}"]`)) return;

  if (!parent) {
    parent = document.getElementById('title');
    if (!parent) return;
  }

  const btn = document.createElement('div');
  const color = btnData.color || "grey";
  btn.className = `button button-${color} unclicked_button`;
  btn.dataset.id = buttonName;

  btn.innerHTML = button_html(btnData, false);

  btn.addEventListener('click', button_click_listener);
  btn.addEventListener('touchstart', button_click_listener);

  parent.parentNode.insertBefore(btn, parent.nextSibling);

  btn.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function button_click_listener() {
  this.classList.toggle('pressed');

  const btnId = this.dataset.id;
  const btnData = BUTTONS[btnId];
  if (!btnData) return;

  if (this.classList.contains('unclicked_button')) {
    this.innerHTML = button_html(btnData, true);
    this.classList.remove('unclicked_button');
  }

  if (btnData && btnData.children) {
    btnData.children.reverse().forEach(childId => {
      create_button(childId, this);
    });
  }
}

function initial_load() {
  document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', button_click_listener);
    btn.addEventListener('touchstart', button_click_listener);
  });

  create_button("start");
}

document.addEventListener('DOMContentLoaded', initial_load);