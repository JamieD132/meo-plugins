let customEmoji = [];
if (localStorage.getItem("customEmoji")) {
    customEmoji = JSON.parse(localStorage.getItem("customEmoji"));
} else {
    customEmoji = [];
}

const actuallyloadpicker = loadpicker;
loadpicker = function () {
    actuallyloadpicker()
    const emjsidebar = document.querySelector(".emojisidebar");
    if (emjsidebar) {
        emjsidebar.insertAdjacentHTML("beforeend", `<button class="emojibuttonside" onclick="emjpage('custom')">🌟</button>`);
    }
    const emjcont = document.querySelector(".emojicont");
    if (emjcont) {
        emjcont.style["max-height"] = "500px";
        emjcont.insertAdjacentHTML("beforeend", `<div class="emojisec" id="custom" style="display:flex;">
            <div class="emojiheader">
                <h3>Custom</h3>
            </div>
        </div>`);
    }
    const customemjsec = document.querySelector('#custom.emojisec');
    if (customemjsec) {
        customEmoji.forEach((emoji) => {
            let [name, id] = [emoji[0], emoji[1]]
            customemjsec.insertAdjacentHTML("beforeend", `<button class="emojibutton" title="${name}" onclick="addemoji('<:${name}:${id}>')"><img src="https://cdn.discordapp.com/emojis/${id}.webp?size=96&quality=lossless" alt="${name}" height="32px"></button>`)
        });
        customemjsec.insertAdjacentHTML("beforeend", `<button class="emojibutton" title="Add Emoji" onclick="customEmojiModal()">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4185 16 16 12.4185 16 8C16 3.58154 12.4185 0 8 0C3.58154 0 0 3.58154 0 8C0 12.4185 3.58154 16 8 16ZM7.06055 11.3604C7.06055 11.8794 7.48145 12.3003 8.00049 12.3003C8.51953 12.3003 8.94043 11.8794 8.94043 11.3604V8.94043H11.3604C11.8794 8.94043 12.3003 8.51953 12.3003 8C12.3003 7.48096 11.8794 7.06006 11.3604 7.06006H8.94043V4.64014C8.94043 4.12109 8.51953 3.7002 8.00049 3.7002C7.48145 3.7002 7.06055 4.12109 7.06055 4.64014V7.06006H4.64014C4.12109 7.06006 3.7002 7.48096 3.7002 8C3.7002 8.51953 4.12109 8.94043 4.64014 8.94043H7.06055V11.3604Z" fill="currentColor"></path>
            </svg>
        </button>`);
    }
}


function customEmojiModal() {
    document.documentElement.style.overflow = "hidden";

    const mdlbck = document.querySelector('.modal-back');
    if (mdlbck) {
        mdlbck.style.display = 'flex';

        const mdl = mdlbck.querySelector('.modal');
        mdl.id = 'mdl-uptd';
        if (mdl) {
            const mdlt = mdl.querySelector('.modal-top');
            if (mdlt) {
                mdlt.innerHTML = `
                <h3>Add Custom Emoji</h3>
                <input id="custom-emoji-input" class="mdl-inp" placeholder="<:example:1260009179024855081>" minlength="1">
                `;
            }
            const mdbt = mdl.querySelector('.modal-bottom');
            if (mdbt) {
                mdbt.innerHTML = `
                <button class="modal-back-btn" onclick="addCustomEmoji()">Add Emoji</button>
                `;
            }
        }
    }
}

function addCustomEmoji() {
    const emojiInput = document.querySelector("#custom-emoji-input").value.trim();
    if (!/^<:.+:\d+>$/.test(emojiInput)) {
        openUpdate("Invalid syntax! Please use discord emoji syntax.");
        return;
    }
    customEmoji.push(emojiInput.slice(2, -1).split(":"));
    localStorage.setItem("customEmoji", JSON.stringify(customEmoji));
    loadpicker();
    emjpage("custom");
    closemodal();
}

// mobile version

const actuallyemojimodal = emojimodal;
emojimodal = function () {
    actuallyemojimodal()
    const emjmodaltop = document.querySelector(".modal-top");
    if (emjmodaltop) {
        emjmodaltop.insertAdjacentHTML("beforeend", `<hr><h3>Custom Emoji</h3><p>the buttons arent as big once you have more emoji ill fix it later i promise<div class="emojimodal customemojimodal"></div>`);
    }
    const emjmodal = document.querySelector(".customemojimodal");
    if (emjmodal) {
        customEmoji.forEach((emoji) => {
            let [name, id] = [emoji[0], emoji[1]]
            emjmodal.insertAdjacentHTML("beforeend", `<button class="emojibuttonm" title="${name}" onclick="addemoji('<:${name}:${id}>')"><img src="https://cdn.discordapp.com/emojis/${id}.webp?size=96&quality=lossless" alt="${name}" height="32px"></button>`)
        });
        emjmodal.insertAdjacentHTML("beforeend", `<button class="emojibuttonmm" title="Add Emoji" onclick="customEmojiModalMobile()">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4185 16 16 12.4185 16 8C16 3.58154 12.4185 0 8 0C3.58154 0 0 3.58154 0 8C0 12.4185 3.58154 16 8 16ZM7.06055 11.3604C7.06055 11.8794 7.48145 12.3003 8.00049 12.3003C8.51953 12.3003 8.94043 11.8794 8.94043 11.3604V8.94043H11.3604C11.8794 8.94043 12.3003 8.51953 12.3003 8C12.3003 7.48096 11.8794 7.06006 11.3604 7.06006H8.94043V4.64014C8.94043 4.12109 8.51953 3.7002 8.00049 3.7002C7.48145 3.7002 7.06055 4.12109 7.06055 4.64014V7.06006H4.64014C4.12109 7.06006 3.7002 7.48096 3.7002 8C3.7002 8.51953 4.12109 8.94043 4.64014 8.94043H7.06055V11.3604Z" fill="currentColor"></path>
            </svg>
        </button>`);
    }
}

function customEmojiModalMobile() {
    customEmojiModal()
    document.querySelector(".modal-back-btn").onclick = addCustomEmojiMobile
}

function addCustomEmojiMobile() {
    const emojiInput = document.querySelector("#custom-emoji-input").value.trim();
    if (!/^<:.+:\d+>$/.test(emojiInput)) {
        openUpdate("Invalid syntax! Please use discord emoji syntax.");
        return;
    }
    customEmoji.push(emojiInput.slice(2, -1).split(":"));
    localStorage.setItem("customEmoji", JSON.stringify(customEmoji));
    emojimodal()
}
