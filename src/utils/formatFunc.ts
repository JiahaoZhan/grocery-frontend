import { BASE_COLOR } from "./constants";

export function capitalizeStartOfEveryWord(str) {
    if (str === undefined) {
        return ""
    }
    str = str.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return str
}

export function extractWordBetweenHyphens(inputString) {
    const firstHyphenIndex = inputString.indexOf('-');
    
    if (firstHyphenIndex === -1) {
        return null; // No hyphen found
    }
    
    const lastHyphenIndex = inputString.lastIndexOf('-');
    
    if (lastHyphenIndex === firstHyphenIndex) {
        return null; // Only one hyphen found
    }
    
    const extractedWord = inputString.substring(firstHyphenIndex + 1, lastHyphenIndex);
    return extractedWord;
}

export function findTotalAndChecked(products, listId) {
    let checked = 0;
    let total = 0;
    products.forEach(product => {
        if (product.list === listId) {
            if (product.checked === true) checked++;
            total++;
        }
    })
    return `${checked}/${total}`
}


export function findColor(listColor, colors) {
    for (const color of colors) {
        if (color[BASE_COLOR] === listColor) {
            return color
        }
    }
    return ""
}