cars = function(content) {
    // eri moment
    const text = content
        .replace(/\bcat\b/gi, "__TEMP_CAT__")  
        .replace(/\bcar\b/gi, "cat")           
        .replace(/__TEMP_CAT__/gi, "car");
    return actuallycars(text);
}

const actuallycars = cars;