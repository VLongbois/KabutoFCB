class Header extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                header{
                display: flex;
                justify-content:space-around;
                align-items:center;
                background: #242424e5;
                position: sticky;
                top:0;
                width: 100%;
                height:72px;
                z-index: 1;
            }
            header h1 {
                order:1;
                line-height: 1;
                font-weight:500;
                display: none;
            }
            header h2{
                width:56px;
                height:56px;
                text-indent:-9999px;
                background: url('/kfcb.png') center / contain no-repeat;
                order:0;
            }
            header button{
                order:2;
                height: 40px;
                border-radius:8px;
                background:transparent;
                padding: 0 12px;
            }
            button:hover {
                cursor: pointer;
            }
            @media (min-width: 768px) {
                header h1 {
                    display: block;
                }
            }
            </style>
            <header>
                <h1>Kabuto fight club Bressuire</h1>
                <h2>Jiu-jitsu Brésilien - Grappling</h2>
                <button id="new-fight">Nouveau combat</button>
            </header>
        `;
        this.shadowRoot!.appendChild(template.content.cloneNode(true));
        this.shadowRoot!.querySelector("#new-fight")!.addEventListener("click", () =>window.dispatchEvent(new Event("new-fight")))
    }



}

customElements.define('kfcb-header', Header);
