const gamerModeStyle = document.getElementById('gamer_mode_style');

const gamer_mode_on_css = `
#buttons_zone .btn-emoji { font-size: 30px; display:block; height: 5px; margin: 10px; padding: 10px; }
#buttons_zone .button { font-size: 0pt; line-height: 0; }
#buttons_zone .button-orange { color: var(--orange); }
#buttons_zone .button-orange.pressed { color: var(--orange-border); }
#buttons_zone .button-purple { color: var(--purple); }
#buttons_zone .button-purple.pressed { color: var(--purple-border); }
#buttons_zone .button-blue { color: var(--blue); }
#buttons_zone .button-blue.pressed { color: var(--blue-border); }
#buttons_zone .button-green { color: var(--green); }
#buttons_zone .button-green.pressed { color: var(--green-border); }
#buttons_zone .button-grey { color: var(--grey); }
#buttons_zone .button-grey.pressed { color: var(--grey-border); }
`;

const gamer_mode_off_css = '#buttons_zone .button { color: var(--black); }';

let gamerMode = gamerModeStyle.textContent.includes('font-size');

const pageDiv = document.getElementById('page_div');
pageDiv.innerHTML = `
<h1>Settings</h1>
<button id="gamer_mode_btn" class="button button-grey${gamerMode ? ' pressed' : ''}">Gamer Mode: ${gamerMode ? 'ON' : 'OFF'}</button>
<br /><br />
TBC WIP<br />
Should have an option to dedupe duplicates, autoscroll, keyboard control<br />
Also control the content of the interface bar.<br />
More lootbox options, etc... autoclicker...

`;

document.getElementById('gamer_mode_btn').onclick = () => {
    gamerMode = !gamerMode;
    const btn = document.getElementById('gamer_mode_btn');
    if (gamerMode) {
        btn.classList.add('pressed');
        btn.textContent = 'Gamer Mode: ON';
        gamerModeStyle.textContent = gamer_mode_on_css;
    } else {
        btn.classList.remove('pressed');
        btn.textContent = 'Gamer Mode: OFF';
        gamerModeStyle.textContent = gamer_mode_off_css;
    }
};