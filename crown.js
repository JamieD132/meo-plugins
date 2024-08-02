
loadpost = function(p) {
    let user;
    let content;
    let bridged = (p.u && bridges.includes(p.u));

    const win = (p.u === eul[0])
    
    if (p.u === "Webhooks") {
        const rcon = p.p; 
        const parts = rcon.split(': ');
        user = parts[0];
        content = parts.slice(1).join(': ');
    } else {
        content = p.p
        user = p.u
    }
    
    const postContainer = document.createElement("div");
    postContainer.classList.add("post");
    postContainer.setAttribute("tabindex", "0");

    const ba = Object.keys(blockedWords);
    const bc = ba.some(word => {
        const regex = new RegExp('\\b' + word + '\\b', 'i');
        return regex.test(content);
    });

    if (bc) {
        if (settingsstuff().censorwords) {
            content = content.replace(new RegExp('\\b(' + ba.join('|') + ')\\b', 'gi'), match => '*'.repeat(match.length));
        } else {
            if (settingsstuff().blockedmessages) {
                postContainer.setAttribute("style", "display:none;");
            } else {
                postContainer.classList.add("blocked");
            }
        }
    }
    
    if (blockedUsers.hasOwnProperty(user)) {
        if (settingsstuff().blockedmessages) {
            postContainer.setAttribute("style", "display:none;");
        } else {
            postContainer.classList.add("blocked");
        }
    }

    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("wrapper");

    const pfpDiv = document.createElement("div");
    pfpDiv.classList.add("pfp");
    
    wrapperDiv.appendChild(createButtonContainer(p));
    
    const mobileButtonContainer = document.createElement("div");
    mobileButtonContainer.classList.add("mobileContainer");
    mobileButtonContainer.innerHTML = `
    <div class='toolbarContainer'>
        <div class='toolButton mobileButton' onclick='reply("${p._id}")' aria-label="reply" title="reply" tabindex="0">
            <svg width='24' height='24' viewBox='0 0 24 24'><path d='M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z' fill='currentColor'></path></svg>
        </div>    
        <div class='toolButton mobileButton' onclick='openModal("${p._id}");'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" clip-rule="evenodd" class=""></path></svg>
        </div>
    </div>
    `;
    
    wrapperDiv.appendChild(mobileButtonContainer);

    const pstdte = document.createElement("i");
    pstdte.classList.add("date");
    tsr = p.t.e;
    tsra = tsr * 1000;
    tsrb = Math.trunc(tsra);
    const ts = new Date();
    ts.setTime(tsrb);
    pstdte.innerText = new Date(tsrb).toLocaleString([], { month: '2-digit', day: '2-digit', year: '2-digit', hour: 'numeric', minute: 'numeric' });

    const pstinf = document.createElement("span");
    pstinf.classList.add("user-header")
    if (win) {
        pstinf.innerHTML = `<span id='username' onclick='openUsrModal("${user}")'>${user}👑</span>`;
    } else {
        pstinf.innerHTML = `<span id='username' onclick='openUsrModal("${user}")'>${user}</span>`;
    }

    if (bridged || p.u == "Webhooks") {
        const bridged = document.createElement("bridge");
        bridged.innerText = lang().meo_bridged.start;
        bridged.setAttribute("title", lang().meo_bridged.title);
        pstinf.appendChild(bridged);
    }
    
    pstinf.appendChild(pstdte);
    wrapperDiv.appendChild(pstinf);

    const roarer = /@([\w-]+)\s+"([^"]*)"\s+\(([^)]+)\)/g;
    const bettermeower = /@([\w-]+)\[([a-zA-Z0-9]+)\]/g;


    let matches1 = [...content.matchAll(roarer)];
    let matches2 = [...content.matchAll(bettermeower)];

    let allMatches = matches1.concat(matches2);

    if (allMatches.length > 0) {
        const replyIds = allMatches.map(match => match[3] || match[2]);
        const pageContainer = document.getElementById("msgs");

        if (pageContainer.firstChild) {
            pageContainer.insertBefore(postContainer, pageContainer.firstChild);
        } else {
            pageContainer.appendChild(postContainer);
        }

        loadreplies(p.post_origin, replyIds).then(replyContainers => {
            replyContainers.forEach(replyContainer => {
                pstinf.after(replyContainer);
            });
        });

        allMatches.forEach(match => {
            content = content.replace(match[0], '').trim();
        });
    }

    const repliesContainer = document.createElement("div");
    p.reply_to.forEach((item) => repliesContainer.appendChild(loadreplyv(item)));
    pstinf.after(repliesContainer);

    let postContentText = document.createElement("p");
    postContentText.className = "post-content";
    // tysm tni <3
    if (typeof md !== 'undefined') {
        md.disable(['image']);
        postContentText.innerHTML = erimd(md.render(content.replace(/&/g, '&amp;')));
        postContentText.innerHTML = meowerEmojis(postContentText.innerHTML, p.emojis || []);
        postContentText.innerHTML = buttonbadges(postContentText);
    } else {
        // fallback for when md doenst work
        // figure this issue OUT
        postContentText.innerHTML = oldMarkdown(content);
        console.error("Parsed with old markdown, fix later :)")
    }
    const emojiRgx = /^(?:(?!\d)(?:\p{Emoji}|[\u200d\ufe0f\u{E0061}-\u{E007A}\u{E007F}]))+$/u;
    const meowerRgx = /^<:[a-zA-Z0-9]{24}>$/g;
    const discordRgx = /^<(a)?:\w+:\d+>$/gi;
    if (emojiRgx.test(content) || (meowerRgx.test(content) && p.emojis.length) || discordRgx.test(content)) {
        postContentText.classList.add('big');
    }
    
    if (content) {
        wrapperDiv.appendChild(postContentText);
    }

    const links = content.match(/(?:https?|ftp):\/\/[^\s(){}[\]]+/g);
    const embd = embed(links);
    if (embd || p.attachments) {
        const embedsDiv = document.createElement('div');
        embedsDiv.classList.add('embeds');
        if (embd) {
            embd.forEach(embeddedElement => {
                embedsDiv.appendChild(embeddedElement);
            });
        }

        p.attachments.forEach(attachment => {
            const g = attach(attachment);
            embedsDiv.appendChild(g);
        });
    
        wrapperDiv.appendChild(embedsDiv);
    }
    

    postContainer.appendChild(wrapperDiv);

    loadPfp(user, 0)
        .then(pfpElement => {
            if (pfpElement) {
                pfpDiv.appendChild(pfpElement);
                pfpCache[user] = pfpElement.cloneNode(true);
                postContainer.insertBefore(pfpDiv, wrapperDiv);
            }
        });

    const pageContainer = document.getElementById("msgs");
    const existingPost = document.getElementById(p._id);
    postContainer.id = p._id;
    if (existingPost) {
        existingPost.replaceWith(postContainer);
    } else if (pageContainer.firstChild && !p._reverse) {
        pageContainer.insertBefore(postContainer, pageContainer.firstChild);
    } else {
        pageContainer.appendChild(postContainer);
    }
}