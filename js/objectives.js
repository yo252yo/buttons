export function capitalize_substrings(text) {
  if (!text || !capitalized_substrings) return text;
  let result = text;
  for (const substr of capitalized_substrings) {
    const regex = new RegExp(substr, 'gi');
    result = result.replace(regex, substr);
  }
  return result;
}

export const capitalized_substrings = [
  "HUMAN",
  "BUTTON",
  "PUSH",

  "ICON",
  "STAR",
  "STORY", "STORIES",
  "GAME",

  "THREAD",
  "PATH", "OBJECTIVE",

  "DIG", "DUG",
  "CONTENT",

  "OWN",
  "END",
  "GOOD",

  "OPTION",

  "DRAW", "DREW ", "DROW",


  "NORMAL",


  "MINE", "YOUR", "MY",
  "THEIR",

  "PROPER",

  "PRIVATE",
  "GENERAL",
  "MAJOR",
  "AMERICA",

  "SIGNIFIER",


  "ESTABLISHMENT",
  "COLONIAL",


  "PARABLE",

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