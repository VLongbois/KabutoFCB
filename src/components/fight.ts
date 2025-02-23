import { Fight as FightModel } from "../models";

class Fight extends HTMLElement {
    private _score1!: HTMLElement
    private _score2!: HTMLElement
    private fight: FightModel | null = null

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.loadFight()
       
    }
    loadFight(){
        const fightData = localStorage.getItem("fight");
        this.fight = fightData ? JSON.parse(fightData) : null;
        this.render();
    }
    render(){
        if(!this.fight) return;
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                kfcb-score{
                    width: 50%;
                }

               .fighters{
                    font-size:1rem;
                    display:flex;
                }
                .fighters>div{
                    width:50%;
                }
                .fighters>div:first-child{
                    text-align:right;
                    padding-right:80px;
                    position:relative
                }
                .fighters>div:first-child::after{
                    content:'VS';
                    position:absolute;
                    right:40px;
                    transform:translate(50%);
                }
                .score{
                    display:flex;
                    justify-content: center;
                }
                @media (min-width: 576px) {
                    .fighters{
                        font-size:2rem;
                    }
                }
                @media (min-width: 768px) {
                    .fighters{
                        font-size:3rem;
                    }
                    kfcb-score{
                        width: 40%;
                    }
                }
            </style>
            <div class="fighters">
                <div>${this.fight.fighter1.name}</div>
                <div>${this.fight.fighter2.name}</div>
            </div>
            <div class="score">
            </div>
            <kfcb-timer time="${this.fight.timer}"></kfcb-timer>
        `;

        this.shadowRoot!.appendChild(template.content.cloneNode(true));
        this._score1 = document.createElement('kfcb-score')
        this._score2 = document.createElement('kfcb-score')

        this.shadowRoot?.querySelector('.score')?.appendChild(this._score1)
        this.shadowRoot?.querySelector('.score')?.appendChild(this._score2)
    }
}

customElements.define('kfcb-fight', Fight);
