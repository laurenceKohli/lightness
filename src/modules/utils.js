import * as convert from "color-convert";

export const generatePalette = (couleurHex) => {
    const couleurHSL = convert.hex.hsl(couleurHex);
    const couleursHSL = [];
    for (let i = 0; i <= 100; i+=10) {
        couleursHSL.push([couleurHSL[0], couleurHSL[1], i])
    }
    return couleursHSL;
}

export const isHexColor = (hex) => /^#[0-9A-F]{6}$/i.test(hex);

export const hexToCSSHSL = (hex) => {
    const hsl = convert.hex.hsl(hex);
    return `${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%`; 
}
