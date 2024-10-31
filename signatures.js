if(!localStorage.hasOwnProperty("signature")) localStorage.setItem("signature", "-# <:disceye:1256330753151733883> Only you can see this • [Dismiss message](https://wlodekm.github.io/is-you/)")

function doMixin(func, origFunc) {
    return function() {func();origFunc();}
}

sendpost = doMixin(function () {
    const msgbox = document.getElementById('msg');
    const messageToAddAfterMessage = "\n"+(localStorage.getItem('signature') ?? "");
    if(!msgbox.value.includes(messageToAddAfterMessage) && msgbox.value != '') {
        msgbox.value += messageToAddAfterMessage;
    }
}, sendpost)

const settingsPages = {}

settingsPages['signatures'] = {
    displayName: "Signatures",
    func: function load() {
        setTop();
        let pageContainer = document.querySelector(".settings");
        pageContainer.innerHTML = `
            <h1>Signatures</h1>
            <textarea placeholder="Type your signature here" onchange="localStorage.setItem('signature', this.value)" style="width: 100%;">${String(localStorage.getItem("signature") ?? "").replaceAll('<', "&lt;")}</textarea>
        `;
    }
}

window.settingsPages = settingsPages

let realLoadstgs = loadstgs;
loadstgs = function () {
    realLoadstgs()
    navc = document.querySelector(".nav-top");
    for (pageid in settingsPages) {
        const pageData = settingsPages[pageid];
        navc.innerHTML += `
    <input type='button' class='settings-button button' id='submit' value='${pageData.displayName.replaceAll("'", "&apos;")}' onclick='window.settingsPages.${pageid}.func()' aria-label="${pageid}">`
    }
};
