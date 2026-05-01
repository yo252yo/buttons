const BUTTONS = {};
const capitalized_substrings = [
  "HUMAN",
  "BUTTON",
  "PUSH",

  "ICON",
  "STAR",
  "STORY", "STORIES",
  "GAME",
  "THREAD",
  "END",

  "OPTION",

  "DRAW", "DREW ", "DROW",

  "MINE",
  "THEIR",

  "LEFT",
  "RIGHT",

  "COLOR",
  "WHITE",
  "GREY",
  "GREEN",
  "BLUE",
  "PURPLE",
  "ORANGE",
];

BUTTONS["start"] = {
  "emoji": "⭐",
  "color": "green",
  "title": "Start",
  "content": `This game is about buttons.<br />
  Buttons have two states: pushed and not pushed.<br />
  When you FIRST click on them, they EXPAND and draw other buttons.`,
  "children": ["tutorial", "beginning", "options", "warning"]
};

BUTTONS["tutorial"] = {
  "emoji": "❓",
  "color": "green",
  "title": "What do I have to do?",
  "content": `Your GOAL is simple: find an ending flag 🏁.<br />
  There's an ending 🏁 at the end of the green 🟢 line.<br />
  There may be others.
  `,
  "children": ["tuto_emoji", "tuto_colors", "tuto_archive", "tuto_star", "tuto_apology"]
};

BUTTONS["warning"] = {
  "emoji": "⚠️",
  "title": "Content warning",
  "content": `This games contains a lot of button pushing, and a lot of TEXT including METAPHORS and ALLEGORIES.<br />
  It discusses sensitive topics such as HISTORY, SLAVERY, INTELLECTUAL PROPERTY, WIP...<br />
  No topic is ever approached without a suitable warning in the unpressed button text.<br />
  Reader discretion is advised when pushing buttons.
  `
};

BUTTONS["options"] = {
  "emoji": "⚙️",
  "title": "Options",
  "content": `WIP: Some buttons are part of the INTERFACE at the top of your screen. They'll appear one by one with context. Obviously a light/dark mode toggle.<br />
  Include a jab about language 🇬🇧 apologize for it being english only but the html structure is dead simple so translation tools should work. Add an aside to explain that websites used to have automated translation but that got out of fashion when google got monopoly over chrome.<br />
  Make sure to include plenty of accessibility options for gamers.
  `
};

BUTTONS["tuto_emoji"] = {
  "emoji": "❓",
  "title": "What's up with the EMOJIs?",
  "content": `Some buttons have icons.<br />
  WIP: You can collect them in this menu ☺️. There might be other quests 🏆 (find names 👥, places 📍, times ⏰, maybe rare collectibles 🐟) `
};

BUTTONS["tuto_colors"] = {
  "emoji": "❓",
  "title": "What's up with the colors?",
  "content": `WIP: Buttons have colors, you can see how many you got in this menu. This is meant to help people track progress. maybe i'll add completion rates at the bottom though its hard in HTML 🎨`
};

BUTTONS["tuto_star"] = {
  "emoji": "❓",
  "title": "What does the star ⭐ mean ?",
  "content": `Star ⭐ is the icon for starter packs. They mark the beginning of a story.`
};

BUTTONS["tuto_archive"] = {
  "emoji": "❓",
  "title": "Help, my screen is full of stuff!",
  "content": `WIP: The thread 🧵 button helps navigate between open threads. The 🗑️ button will give you options to cleanup READ messages. 💾 there will be a save management file to allow EASY sync between different devices/different scenarii of the game engine maybe`
};

BUTTONS["tuto_apology"] = {
  "emoji": "❓",
  "title": "This tutorial is too long!",
  "content": `I apologize, this is brand new game engine, a lot of things need to be explained.<br />
  Feel free to skip everything you want, or look at the ⚙️ options to customize your experience.`,
  "children": ["options"]
};


BUTTONS["beginning"] = {
  "emoji": "⭐",
  "color": "green",
  "title": "The Human Who Pushed Buttons",
  "content": `There once was a human, who pushed buttons.`,
  "children": ["intro_grey", "intro_green", "intro_blue", "intro_purple", "intro_orange"]
};

BUTTONS["intro_grey"] = {
  "color": "grey",
  "title": "Some buttons were grey.",
};

BUTTONS["intro_green"] = {
  "color": "green",
  "title": "Some buttons were green.",
  "children": ["intro_draw", "intro_draw2"]
};

BUTTONS["intro_blue"] = {
  "color": "blue",
  "title": "Some buttons were blue.",
};

BUTTONS["intro_purple"] = {
  "color": "purple",
  "title": "Some buttons were purple.",
};

BUTTONS["intro_orange"] = {
  "color": "orange",
  "title": "Some buttons were orange.",
};

BUTTONS["intro_draw"] = {
  "color": "green",
  "title": "Some buttons drew more buttons.",
  "children": ["intro_draw3"]
};

BUTTONS["intro_draw2"] = {
  "title": "Some buttons did not draw more buttons.",
  "children": ["intro_draw3"]
};

BUTTONS["intro_draw3"] = {
  "title": "It was always a surprise to push buttons and wonder what would happen next.",
  "color": "green",
  "children": ["intro_draw4"]
};

BUTTONS["intro_draw4"] = {
  "title": "And so the human kept pushing buttons.",
  "content": `The human pushed buttons by day,<br />
  The human pushed buttons by night.<br />
  So much so that the human's life was mostly pushing buttons.<br />
  But the human had to keep pushing.<br />
  How else would the human live?`,
  "children": ["found_flag"]
};

BUTTONS["found_flag"] = {
  "title": "One day, while pushing buttons, the human came accross an ending flag 🏁.",
  "color": "green",
  "content": `This puzzled the human quite a bit. An ending flag 🏁 ? So soon?`,
  "children": ["more", "end_flag"]
};

BUTTONS["end_flag"] = {
  "emoji": "🏁",
  "color": "green",
  "title": "And so it came to be that the human stopped pushing buttons.",
};

BUTTONS["more"] = {
  "title": "Could there be MORE to this story?",
  "content": `Could there be hidden depths burried far below what meets the eye?`,
  "children": ["more2"]
};

BUTTONS["more2"] = {
  "color": "orange",
  "title": "Could there be an orange button drowned in a sea of grey?",
  "content": `That is when the human found a story.<br />
  It laid there, shining green, in the middle of all the buttons.<br />
  It was story left untold, almost forgotten.<br />
  And its title was...`,
  "children": ["title"]
};

BUTTONS["title"] = {
  "emoji": "⭐",
  "color": "green",
  "title": "The Story of Robinson Crusoe",
  "content": `WIP Stay tuned for the rest, it will surprise you.`,
  "children": ["title_aside"]
};

BUTTONS["title_aside"] = {
  "color": "purple",
  "title": "The story of a white man?",
  "content": `Alas, that is where we must start.<br />
  Humans do love their stories to be character-centered.<br />
  But fear not, you will see many characters if you press the right buttons.`,
  "children": ["title_aside2"]
};

BUTTONS["title_aside2"] = {
  "title": "Though I guess a lot of them were white men.",
  "content": `Sorry, its mostly their story.<br />
  But it doesn't have to be about them.`,
};


window.BUTTONS = BUTTONS;