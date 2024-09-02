function ulistcrown() {
    const elements = document.querySelectorAll(`[data-user-title="${sul.split(", ")[0]}"]`);
    elements.forEach(element => {
        element.innerText = `${sul.split(", ")[0]}👑`;
    });
}

// this was the best i could do, if anyone has a better solution please let me know
setInterval(ulistcrown, 500);