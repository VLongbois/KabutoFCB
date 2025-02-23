class App extends HTMLElement {
    private hasFight: boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.checkFightState();
        this.listenEvents();
    }

    checkFightState() {
        const fightData = localStorage.getItem("fight");
        this.hasFight = fightData !== null;

        this.render();
    }

    listenEvents() {
        window.addEventListener("new-fight", () => {
            this.hasFight = false;
            localStorage.removeItem("fight"); // Supprimer l'ancien fight
            this.render();
        });

        // Écouter l'événement "fight-cree" quand un nouveau fight est enregistré
        window.addEventListener("fight-create", (event: Event) => {
            const detail = (event as CustomEvent).detail;
            localStorage.setItem("fight", JSON.stringify(detail)); // Sauvegarde
            this.hasFight = true;
            this.render();
        });
    }

    render() {
        this.shadowRoot!.innerHTML = ""; // Nettoyage

        const component = document.createElement(this.hasFight ? "kfcb-fight" : "kfcb-newfight");
        if(this.hasFight){
            
        }
        this.shadowRoot!.appendChild(component);
    }
}

customElements.define("kfcb-app", App);
