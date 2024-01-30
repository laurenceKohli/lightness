import { generatePalette, isHexColor, hexToCSSHSL } from "./modules/utils";
import { Color } from "./modules/Color";
import * as convert from "color-convert";

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
// Create an instance of Notyf
const notyf = new Notyf();

document.querySelector("form").addEventListener("submit", (e) => {
    try {
        e.preventDefault();
        const input = e.target.firstElementChild.value;
            if (!isHexColor(input)) {
                throw new Error(`${input} is not a valid Hexadecimal color`);
            }
        const couleurs = generatePalette(input);

        displayColors(input, couleurs);

    } catch (err) {
        notyf.error(err.message);
    }
})

const displayColors = (inputColor, palette) => {
    const main = document.querySelector("main");
    main.innerHTML = "";
    palette.forEach(couleur => {
        const instance = new Color(couleur);
        instance.display(main);
    });

    const gradientColors = [0, Math.round(palette.length / 2), palette.length - 1].map(
        (index) => `#${convert.hsl.hex(palette[index])}`
      );
    document.documentElement.style.setProperty("--shadow-color", hexToCSSHSL(inputColor));

    document.querySelector("header").classList.add("minimized");
    document.body.style.background = `linear-gradient(-45deg, ${gradientColors.join(",")})`
    document.body.style.backgroundSize = `400% 400%`;
}

const handleClick = async (e) => {
    const color = e.target.closest(".color").dataset.color;
    await navigator.clipboard.writeText(color);
    notyf.success(`copied ${color} to clipboard`);
};

document.querySelector("main").addEventListener("click", handleClick);
