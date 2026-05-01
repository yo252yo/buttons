
const BUTTONS = {};

const LINKS = {};

BUTTONS["start"] = {
  "emoji": "⭐",
  "color": "green",
  "title": "Start",
  "content": `This game is about buttons.<br />
  Buttons have two states: pushed and not pushed.<br />
  When you FIRST click on them, they EXPAND and draw other buttons.`
};
LINKS["start"] = ["tutorial", "beginning", "options", "warning"];

BUTTONS["tutorial"] = {
  "emoji": "❓",
  "color": "green",
  "title": "What do I have to do?",
  "content": `Your GOAL is simple: find an ending flag 🏁.<br />
  There's an ending 🏁 at the end of the green 🟢 line.<br />
  There may be others.`
};
LINKS["tutorial"] = ["tuto_emoji", "tuto_colors", "tuto_archive", "tuto_star", "tuto_apology"];

BUTTONS["warning"] = {
  "emoji": "⚠️",
  "color": "grey",
  "title": "Content warning",
  "content": `This games contains a lot of button pushing, and a lot of TEXT including METAPHORS and ALLEGORIES.<br />
  It discusses sensitive topics such as colors, HISTORY, SLAVERY, INTELLECTUAL PROPERTY, WIP...<br />
  No topic is ever approached without a suitable warning in the unpressed button text.<br />
  Never forget who is pushing the buttons.<br />
  Reader discretion is advised when pushing buttons.`
};
LINKS["warning"] = [];

BUTTONS["options"] = {
  "emoji": "⚙️",
  "color": "grey",
  "title": "Options",
  "content": `WIP: Some buttons are part of the INTERFACE at the top of your screen. They'll appear one by one with context. Obviously a light/dark mode toggle.<br />
  Include a jab about language 🇬🇧 apologize for it being english only but the html structure is dead simple so translation tools should work. Add an aside to explain that websites used to have automated translation but that got out of fashion when google got monopoly over chrome.<br />
  Make sure to include plenty of accessibility options for gamers.`
};
LINKS["options"] = [];

BUTTONS["tuto_emoji"] = {
  "emoji": "❓",
  "color": "grey",
  "title": "What's up with the EMOJIs?",
  "content": `Some buttons have icons.<br />
  WIP: You can collect them in this menu ☺️. There might be other quests 🏆 (find names 👥, places 📍, times ⏰, maybe rare collectibles 🐟)`
};
LINKS["tuto_emoji"] = [];

BUTTONS["tuto_colors"] = {
  "emoji": "❓",
  "color": "grey",
  "title": "What's up with the colors?",
  "content": `WIP: Buttons have colors, you can see how many you got in this menu. This is meant to help people track progress. maybe i'll add completion rates at the bottom though its hard in HTML 🎨`
};
LINKS["tuto_colors"] = [];

BUTTONS["tuto_star"] = {
  "emoji": "❓",
  "color": "grey",
  "title": "What does the star ⭐ mean ?",
  "content": `Star ⭐ is the icon for starter packs. They mark the beginning of a story.`
};
LINKS["tuto_star"] = [];

BUTTONS["tuto_archive"] = {
  "emoji": "❓",
  "color": "grey",
  "title": "Help, my screen is full of stuff!",
  "content": `WIP: The thread 🧵 button helps navigate between open threads. The 🗑️ button will give you options to cleanup READ messages. 💾 there will be a save management file to allow EASY sync between different devices/different scenarii of the game engine maybe`
};
LINKS["tuto_archive"] = [];

BUTTONS["tuto_apology"] = {
  "emoji": "❓",
  "color": "grey",
  "title": "This tutorial is too long!",
  "content": `I apologize, this is brand new game engine, a lot of things need to be explained.<br />
  Feel free to skip everything you want, or look at the ⚙️ options to customize your experience.`
};
LINKS["tuto_apology"] = ["options"];

BUTTONS["beginning"] = {
  "emoji": "⭐",
  "color": "green",
  "title": "The Human Who Pushed Buttons",
  "content": `There once was a human, who pushed buttons.`
};
LINKS["beginning"] = ["intro_grey", "intro_green", "intro_blue", "intro_purple", "intro_orange"];

BUTTONS["intro_grey"] = {
  "emoji": "",
  "color": "grey",
  "title": "Some buttons were grey.",
  "content": ``
};
LINKS["intro_grey"] = [];

BUTTONS["intro_green"] = {
  "emoji": "",
  "color": "green",
  "title": "Some buttons were green.",
  "content": ``
};
LINKS["intro_green"] = ["intro_draw", "intro_draw2"];

BUTTONS["intro_blue"] = {
  "emoji": "",
  "color": "blue",
  "title": "Some buttons were blue.",
  "content": ``
};
LINKS["intro_blue"] = [];

BUTTONS["intro_purple"] = {
  "emoji": "",
  "color": "purple",
  "title": "Some buttons were purple.",
  "content": ``
};
LINKS["intro_purple"] = [];

BUTTONS["intro_orange"] = {
  "emoji": "",
  "color": "orange",
  "title": "Some buttons were orange.",
  "content": ``
};
LINKS["intro_orange"] = [];

BUTTONS["intro_draw"] = {
  "emoji": "",
  "color": "green",
  "title": "Some buttons drew more buttons.",
  "content": ``
};
LINKS["intro_draw"] = ["intro_draw3"];

BUTTONS["intro_draw2"] = {
  "emoji": "",
  "color": "grey",
  "title": "Some buttons did not draw more buttons.",
  "content": ``
};
LINKS["intro_draw2"] = ["intro_draw3"];

BUTTONS["intro_draw3"] = {
  "emoji": "",
  "color": "green",
  "title": "It was always a surprise to push buttons and wonder what would happen next.",
  "content": ``
};
LINKS["intro_draw3"] = ["intro_draw4"];

BUTTONS["intro_draw4"] = {
  "emoji": "",
  "color": "green",
  "title": "And so the human kept pushing buttons.",
  "content": `The human pushed buttons by day,<br />
  The human pushed buttons by night.<br />
  So much so that the human's life was mostly pushing buttons.<br />
  But the human had to keep pushing.<br />
  How else would the human live?`
};
LINKS["intro_draw4"] = ["found_flag"];

BUTTONS["found_flag"] = {
  "emoji": "",
  "color": "green",
  "title": "One day, while pushing buttons, the human came accross an ending flag 🏁.",
  "content": `This puzzled the human quite a bit. An ending flag 🏁 ? So soon?`
};
LINKS["found_flag"] = ["more", "end_flag"];

BUTTONS["end_flag"] = {
  "emoji": "🏁",
  "color": "green",
  "title": "And so it came to be that the human stopped pushing buttons.",
  "content": ``
};
LINKS["end_flag"] = [];

BUTTONS["more"] = {
  "emoji": "",
  "color": "grey",
  "title": "Could there be MORE to this story?",
  "content": `Could there be hidden depths burried far below what meets the eye?`
};
LINKS["more"] = ["more2"];

BUTTONS["more2"] = {
  "emoji": "",
  "color": "orange",
  "title": "Could there be an orange button drowned in a sea of grey?",
  "content": `That is when the human found a story.<br />
  It laid there, shining green, in the middle of all the buttons.<br />
  It was story left untold, almost forgotten.<br />
  And its title was...`
};
LINKS["more2"] = ["title"];

BUTTONS["title"] = {
  "emoji": "⭐",
  "color": "green",
  "title": "The true story of the story of Robinson Crusoe",
  "content": `WIP Stay tuned for the rest, it will surprise you.`
};
LINKS["title"] = ["title_aside", "d0c1f86e10f949da"];

BUTTONS["title_aside"] = {
  "emoji": "",
  "color": "purple",
  "title": "The story of a white man?",
  "content": `Alas, that is where we must start.<br />  Humans do love their stories to be character-centered.<br />  But fear not, you will see many characters if you press the right buttons.`
};
LINKS["title_aside"] = ["title_aside2", "49209c0bf5486f14"];

BUTTONS["title_aside2"] = {
  "emoji": "",
  "color": "grey",
  "title": "Though I guess a lot of them were white men.",
  "content": `Sorry, its mostly their story.<br />  But it doesn't have to be about them.`
};
LINKS["title_aside2"] = [];

BUTTONS["d0c1f86e10f949da"] = {
  "emoji": "",
  "color": "green",
  "title": "Robinson Crusoe?",
  "content": `Robinson Crusoe is an English adventure novel by Daniel Defoe, first published on 25 April 1719.<br />Most people are familiar with its narrative of a sailor shipwrecked on a wild island.<br />But few people even know the story of the story.`
};
LINKS["d0c1f86e10f949da"] = ["6a342d3d556dcaa3", "f919133328a5e0d3", "d674c3e21ca88716", "e8a4775851bc5327"];

BUTTONS["6a342d3d556dcaa3"] = {
  "emoji": "",
  "color": "grey",
  "title": "What do you mean, the story of the story?",
  "content": `I mean the story of how the book came to be, and the story of its author.`
};
LINKS["6a342d3d556dcaa3"] = [];

BUTTONS["49209c0bf5486f14"] = {
  "emoji": "",
  "color": "orange",
  "title": "I can't help but wonder if this psychological bias in stories reinforces a hyper-individualistic society.",
  "content": ``
};
LINKS["49209c0bf5486f14"] = [];

BUTTONS["d674c3e21ca88716"] = {
  "emoji": "⭐",
  "color": "grey",
  "title": "The Life of Daniel Defoe",
  "content": `In a very condensed format.`
};
LINKS["d674c3e21ca88716"] = ["d3b4516848b37f0d"];

BUTTONS["e8a4775851bc5327"] = {
  "emoji": "That's",
  "color": "blue",
  "title": "not the title of the book, though",
  "content": `Its original title was:<br />\"The<br />LIFE<br />and<br />Strange Surprizing <br />ADVENTURES<br />of <br />Robinson Crusoe<br />of York, Mariner:<br /><br />Who lived Eight and Twenty Years, all alone in an un-inhabited Island on the Coast of America, near the Mouth of the Great River of Oroonoque;<br />Having been cast on Shore by Shipwreck, wherein all the Men perished but himself. <br /><br />WITH<br />An Account how he was at last as strangely deliver'd by Pyrates. <br />Written by Himself.\"<br /><br />You can see it for yourself on <a href=\"https://en.wikipedia.org/wiki/File:Robinson_Crusoe_1719_1st_edition.jpg\" target=\"_blank\">Wikimedia.<br /><br /><img src=\"https://upload.wikimedia.org/wikipedia/commons/1/1e/Robinson_Crusoe_1719_1st_edition.jpg\" /></a>`
};
LINKS["e8a4775851bc5327"] = ["e100bf5300059e3b", "bcc0cef568d3e4b0", "d59c4d2f4f4674df", "6fc3fd90e4ff2bf8", "72d5074d19b63713"];

BUTTONS["d59c4d2f4f4674df"] = {
  "emoji": "",
  "color": "purple",
  "title": "Strange surprizing adventures...",
  "content": `Like the one you're living right now!`
};
LINKS["d59c4d2f4f4674df"] = [];

BUTTONS["72d5074d19b63713"] = {
  "emoji": "",
  "color": "grey",
  "title": "You forgot the part at the bottom...",
  "content": ``
};
LINKS["72d5074d19b63713"] = ["ed26200129d229b8", "99677d0088771e0d"];

BUTTONS["6fc3fd90e4ff2bf8"] = {
  "emoji": "🏴‍☠️",
  "color": "purple",
  "title": "PYRATES?",
  "content": ``
};
LINKS["6fc3fd90e4ff2bf8"] = [];

BUTTONS["ed26200129d229b8"] = {
  "emoji": "👥",
  "color": "grey",
  "title": "Printed for W. Taylor",
  "content": ``
};
LINKS["ed26200129d229b8"] = [];

BUTTONS["99677d0088771e0d"] = {
  "emoji": "📍",
  "color": "grey",
  "title": "at the Shop in Pater-Noster-Row",
  "content": ``
};
LINKS["99677d0088771e0d"] = [];

BUTTONS["f919133328a5e0d3"] = {
  "emoji": "",
  "color": "grey",
  "title": "It was a groundbreaking book",
  "content": ``
};
LINKS["f919133328a5e0d3"] = [];

BUTTONS["e100bf5300059e3b"] = {
  "emoji": "That's",
  "color": "grey",
  "title": "a very long title...",
  "content": ``
};
LINKS["e100bf5300059e3b"] = [];

BUTTONS["bcc0cef568d3e4b0"] = {
  "emoji": "Wait...",
  "color": "grey",
  "title": "written by himself?",
  "content": ``
};
LINKS["bcc0cef568d3e4b0"] = [];

BUTTONS["d3b4516848b37f0d"] = {
  "emoji": "👥",
  "color": "grey",
  "title": "Daniel Defoe was born in 1660",
  "content": ``
};
LINKS["d3b4516848b37f0d"] = [];


export { BUTTONS, LINKS };
