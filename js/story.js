const BUTTONS = {};

BUTTONS["start"] = {
  "emoji": "⭐",
  "color": "green",
  "title": "STARt",
  "content": `This game is about BUTTONS.<br />
  BUTTONS have two states: PRESSED and not PRESSED.<br />
  When you FIRST click on them, they EXPAND and DRAW other BUTTONS.`,
  "children": ["tutorial", "beginning", "options"]
};

BUTTONS["tutorial"] = {
  "emoji": "❔",
  "color": "green",
  "title": "What do I have to do?",
  "content": `Your GOAL is simple: find an ENDING flag 🏁.<br />
  There's an ENDING 🏁 at the end of the GREEN 🟢 line.<br />
  There may be others.
  `,
  "children": ["tuto_emoji", "tuto_colors", "tuto_archive", "tuto_star"]
};

BUTTONS["options"] = {
  "emoji": "⚙️",
  "title": "Options",
  "content": `WIP: Some BUTTONS are part of the INTERFACE at the top of your screen. They'll appear one by one with context. Obviously a light/dark mode toggle
  `
};

BUTTONS["tuto_emoji"] = {
  "emoji": "❔",
  "title": "What's up with the EMOJIs?",
  "content": `Some buttons have ICONS.<br />
  WIP: You can COLLECT them in this menu ☺️. There might be other quests 🏆 (find names 👥, places 📍, times ⏰, maybe rare collectibles 🐟) `
};

BUTTONS["tuto_colors"] = {
  "emoji": "❔",
  "title": "What's up with the COLORs?",
  "content": `WIP: buttons have colors, you can see how many you got in this menu. This is meant to help people track progress. maybe i'll add completion rates at the bottom though its hard in HTML 🎨`
};

BUTTONS["tuto_star"] = {
  "emoji": "❔",
  "title": "What does the star ⭐ mean ?",
  "content": `Star ⭐ is the ICON for STARter packs. They mark the beginning of a STORY.`
};

BUTTONS["tuto_archive"] = {
  "emoji": "❔",
  "title": "Help, my screen is full of stuff!",
  "content": `WIP: The THREAD 🧵 button helps navigate between open threads. The 🗑️ button will give you options to cleanup READ messages. 💾 there will be a save management file to allow EASY sync between different devices/different scenarii of the game engine maybe`
};

BUTTONS["beginning"] = {
  "emoji": "⭐",
  "color": "green",
  "title": "The Human Who Pressed Button",
  "content": `There once was a Human, who pressed BUTTONS.`,
  "children": []
};

window.BUTTONS = BUTTONS;