const green = erimd;
erimd = function(content) {
    const text = content
        .replace(/\bwhat\b/gi, "whar")  
    return green(text);
}