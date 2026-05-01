const BUTTONS = {};

BUTTONS["start"] = {
  "emoji": "⭐",
  "color": "green",
  "title": "STARt",
  "content": `This game is about BUTTONS.<br />
  BUTTONS have two states: PRESSED and not PRESSED.<br />
  When you FIRST click on them, they EXPAND and DRAW other BUTTONS.`,
  "children": ["tutorial", "options"]
};

BUTTONS["tutorial"] = {
  "emoji": "❔",
  "color": "green",
  "title": "What do I have to do?",
  "content": `Your GOAL is simple: find an ENDING flag 🏁.<br />
  There's an ENDING 🏁 at the end of the GREEN 🟢 line.<br />
  There may be others.
  `,
  "children": ["tuto_emoji", "tuto_colors", "tuto_archive"]
};

BUTTONS["options"] = {
  "emoji": "⚙️",
  "title": "Options",
  "content": `Some BUTTONS are part of the INTERFACE at the top of your screen.<br />
  `
};

BUTTONS["tuto_emoji"] = {
  "emoji": "❔",
  "title": "What's up with the EMOJIs?",
  "content": `Some buttons have ICONS.<br />
  WIP: You can COLLECT them in this menu ☺️`
};

BUTTONS["tuto_colors"] = {
  "emoji": "❔",
  "title": "What's up with the COLORs?",
  "content": `WIP: buttons have colors, you can see how many you got in this menu 🎨`
};

BUTTONS["tuto_archive"] = {
  "emoji": "❔",
  "title": "Help, my screen is full of stuff!",
  "content": `WIP: The THREAD 🧵 button helps navigate between open threads. The 🗑️ button will give you options to manage READ messages`
};

function button_html(btnData, expanded) {
  if (expanded) {
    return `<b>${btnData.emoji || ''} - ${btnData.title}</b><br/>${btnData.content}`;
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

  // initial unclicked content: emoji - title
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

  // if still unclicked, expand content and remove unclicked class
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

function bind_buttons_to_click() {
  document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', button_click_listener);
    btn.addEventListener('touchstart', button_click_listener);
  });

  create_button("start");
}

document.addEventListener('DOMContentLoaded', bind_buttons_to_click);