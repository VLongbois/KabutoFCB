import { Score as ScoreM } from "../../models"

class Score extends HTMLElement {
    private score: ScoreM = new ScoreM()

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                button{                
                    background:transparent;
                    border-style: none;
                }
                button:hover {
                    cursor: pointer;
                }
                #point{
                    position:relative;
                    font-size:8rem;
                    line-height:1;
                    text-align: center;
                    padding:1.5rem;
                }
                
                #advantage,#penality{
                    position:relative;
                    font-size:5rem;
                    line-height:1;
                    text-align: center;
                    padding:1rem;
                }
                #point button,#advantage button,#penality button{
                    position:absolute;
                    top:0;
                    width:50%;
                    height:100%;
                }
                #point-inc,#advantage-inc,#penality-inc{
                    left:50%;
                }
                #point-dec,#advantage-dec,#penality-dec{
                    left:0;
                }
                #advantage{color:#2bd471}
                #penality{color:#DD5662}
                @media (min-width: 576px) {
                    #point{
                        font-size:9rem;
                    }
                    #advantage,#penality{
                        font-size:6rem;
                    }
                }
                @media (min-width: 768px) {
                    #point{
                        font-size:10rem;
                    }
                    #advantage,#penality{
                        font-size:7rem;
                    }
                    #penality{
                        margin-bottom:2rem;
                    }
                }
            </style>
            <div id="point">
                <span id="point-val">0</span>
                <button id="point-dec"></button>
                <button id="point-inc"></button>
            </div>
            <div id="advantage">
                <span id="advantage-val">0</span>
                <button id="advantage-dec"></button>
                <button id="advantage-inc"></button>
            </div>
            <div id="penality">
                <span id="penality-val">0</span>
                <button id="penality-dec"></button>
                <button id="penality-inc"></button>
            </div>
        `;
        this.shadowRoot!.appendChild(template.content.cloneNode(true));
        this.setupListeners();
        this.updateUI();
    }

    setupListeners() {
        ["point", "advantage", "penality"].forEach((key) => {
            this.shadowRoot!.querySelector(`#${key}-inc`)?.addEventListener("click", () => this.updateValue(key as keyof ScoreM, 1));
            this.shadowRoot!.querySelector(`#${key}-dec`)?.addEventListener("click", () => this.updateValue(key as keyof ScoreM, -1));
        });
    }

    updateValue(key: keyof typeof this.score, delta: number) {
        this.score[key] += delta;
        this.updateUI();

        // Envoyer un événement au parent avec les nouvelles valeurs
        this.dispatchEvent(new CustomEvent("value-changed", {
            detail: { ...this.score },
            bubbles: true, // Permet au parent de l'écouter
            composed: true // Permet de traverser le shadow DOM
        }));
    }

    updateUI() {
        ["point", "advantage", "penality"].forEach((key) => {
            this.shadowRoot!.querySelector(`#${key}-val`)!.textContent = this.score[key as keyof ScoreM].toString();
        });
    }

}

customElements.define('kfcb-score', Score);
export default Score;
