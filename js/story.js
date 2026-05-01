const BUTTONS = {};

BUTTONS["start"] = {
  "emoji": "⭐",
  "color": "green",
  "title": "STARt",
  "content": `This game is about BUTTONS.<br />
  BUTTONS have two states: PUSHED and not PUSHED.<br />
  When you FIRST click on them, they EXPAND and DRAW other BUTTONS.`,
  "children": ["tutorial", "beginning", "options", "warning"]
};

BUTTONS["tutorial"] = {
  "emoji": "❓",
  "color": "green",
  "title": "What do I have to do?",
  "content": `Your GOAL is simple: find an ENDING flag 🏁.<br />
  There's an ENDING 🏁 at the end of the GREEN 🟢 line.<br />
  There may be others.
  `,
  "children": ["tuto_emoji", "tuto_colors", "tuto_archive", "tuto_star"]
};

BUTTONS["warning"] = {
  "emoji": "⚠️",
  "title": "Content warning",
  "content": `This games contains a lot of BUTTON pushing, and a lot of TEXT including METAPHORS and ALLEGORIES.<br />
  It discusses sensitive topics such as HISTORY, SLAVERY, INTELLECTUAL PROPERTY, WIP...<br />
  No topic is ever approached without a suitable warning in the unpressed BUTTON text.<br />
  Reader discretion is advised when pushing BUTTONs.
  `
};

BUTTONS["options"] = {
  "emoji": "⚙️",
  "title": "Options",
  "content": `WIP: Some BUTTONS are part of the INTERFACE at the top of your screen. They'll appear one by one with context. Obviously a light/dark mode toggle
  `
};

BUTTONS["tuto_emoji"] = {
  "emoji": "❓",
  "title": "What's up with the EMOJIs?",
  "content": `Some BUTTONs have ICONS.<br />
  WIP: You can COLLECT them in this menu ☺️. There might be other quests 🏆 (find names 👥, places 📍, times ⏰, maybe rare collectibles 🐟) `
};

BUTTONS["tuto_colors"] = {
  "emoji": "❓",
  "title": "What's up with the COLORs?",
  "content": `WIP: BUTTONs have colors, you can see how many you got in this menu. This is meant to help people track progress. maybe i'll add completion rates at the bottom though its hard in HTML 🎨`
};

BUTTONS["tuto_star"] = {
  "emoji": "❓",
  "title": "What does the star ⭐ mean ?",
  "content": `Star ⭐ is the ICON for STARter packs. They mark the beginning of a STORY.`
};

BUTTONS["tuto_archive"] = {
  "emoji": "❓",
  "title": "Help, my screen is full of stuff!",
  "content": `WIP: The THREAD 🧵 BUTTON helps navigate between open threads. The 🗑️ BUTTON will give you options to cleanup READ messages. 💾 there will be a save management file to allow EASY sync between different devices/different scenarii of the game engine maybe`
};

BUTTONS["beginning"] = {
  "emoji": "⭐",
  "color": "green",
  "title": "The Human Who Pushed BUTTONs",
  "content": `There once was a Human, who pushed BUTTONs.`,
  "children": ["intro_grey", "intro_green", "intro_blue", "intro_purple", "intro_orange"]
};

BUTTONS["intro_grey"] = {
  "color": "grey",
  "title": "Some BUTTONs were GREY.",
};

BUTTONS["intro_green"] = {
  "color": "green",
  "title": "Some BUTTONs were GREEN.",
  "children": ["intro_draw", "intro_draw2"]
};

BUTTONS["intro_blue"] = {
  "color": "blue",
  "title": "Some BUTTONs were BLUE.",
};

BUTTONS["intro_purple"] = {
  "color": "purple",
  "title": "Some BUTTONs were PURPLE.",
};

BUTTONS["intro_orange"] = {
  "color": "orange",
  "title": "Some BUTTONs were ORANGE.",
};

BUTTONS["intro_draw"] = {
  "color": "green",
  "title": "Some BUTTONs DREW more BUTTONs.",
  "children": ["intro_draw3"]
};

BUTTONS["intro_draw2"] = {
  "title": "Some BUTTONs did not DRAW more buttons.",
  "children": ["intro_draw3"]
};

BUTTONS["intro_draw3"] = {
  "title": "It was always a surprise to push BUTTONs and wonder what would happen next.",
  "color": "green",
  "children": ["found_flag"]
};

BUTTONS["found_flag"] = {
  "title": "One day, while pushing BUTTONs, the human came accross an ENDING flag 🏁.",
  "color": "green",
  "content": `This puzzled the Human quite a bit. An ENDING flag 🏁 ? So soon?`,
  "children": ["end_flag", "more"]
};

BUTTONS["end_flag"] = {
  "emoji": "🏁",
  "color": "green",
  "title": "And so it came to be that the human stopped pushing BUTTONs.",
};

BUTTONS["more"] = {
  "title": "Could there be MORE to this story?",
};

// human pressed button day and night to make the economy spin


window.BUTTONS = BUTTONS;