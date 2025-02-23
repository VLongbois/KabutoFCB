import { Fight, Fighter } from "../../models";

class NewFight extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                h1{
                    text-align: center;
                }
                form{
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                }
                label{
                    display: block;
                    margin-bottom: 1rem;
                }
                input{
                    margin-left: 1rem;
                }
                button{
                    width: 60%;
                    align-self: center;
                    background-color: #197941;
                    border: none;
                    height: 40px;
                    margin-top: 3rem;
                    border-radius: 10px;
                }
                button:hover{
                    cursor: pointer;
                    background-color: #092D18;
                }
            </style>
            <h1>Création d'un nouveau combat</h1>

            <form id="fight-form">
                <div>
                    <label>Combattant 1
                        <input name="fighter1" type="text" />
                    </label>
                </div>
                <div>
                    <label>Combattant 2
                        <input name="fighter2" type="text" />
                    </label>
                </div>
                <div>
                    <label>Temps (en sec)
                        <input name="time" type="number" value="60"/>
                    </label>
                </div>
                <button type="submit">Valider</button>
            </form>
        `;
        this.shadowRoot!.appendChild(template.content.cloneNode(true));
        this.shadowRoot!.querySelector("#fight-form")!.addEventListener("submit", (event) => this.createFight(event));
    }

    createFight(event: Event) {
        event.preventDefault();
        const fighter1 = (this.shadowRoot!.querySelector("[name=fighter1]") as HTMLInputElement).value.trim();
        const fighter2 = (this.shadowRoot!.querySelector("[name=fighter2]") as HTMLInputElement).value.trim();
        const time = (this.shadowRoot!.querySelector("[name=time]") as HTMLInputElement).value;
        const fight = new Fight(new Fighter(fighter1 === '' ? 'Combattant 1' : fighter1),
            new Fighter(fighter2 === '' ? 'Combattant 2' : fighter2),
            Number(time))
        window.dispatchEvent(new CustomEvent("fight-create", { detail: fight }));
    }


}

customElements.define('kfcb-newfight', NewFight);
export default NewFight;
