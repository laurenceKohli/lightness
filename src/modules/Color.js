import * as convert from "color-convert";
 export class Color {
    #hsl;
    #hex;
    #element;

    constructor(hslC){
        this.#hsl = hslC;
        this.#hex = `#${convert.hsl.hex(hslC)}`;
        this.#element = this.#generateElement();
    }

    #generateElement(){
        const div = document.createElement("div");
        div.classList.add("color");
        div.style.backgroundColor = this.#hex;
        div.dataset.color = this.#hex;

        const p = document.createElement("p");
        p.style.color = this.#hsl[2] < 60 ? "#ffffff" : "#000000";
        p.textContent = this.#hex;
        div.appendChild(p);
        
        return div;
    }

    display(main){
        main.appendChild(this.#element);
    }
}