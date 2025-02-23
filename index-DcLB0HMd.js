var l=Object.defineProperty;var c=(r,e,t)=>e in r?l(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var o=(r,e,t)=>c(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();class p extends HTMLElement{constructor(){super();o(this,"hasFight",!1);this.attachShadow({mode:"open"}),this.checkFightState(),this.listenEvents()}checkFightState(){const t=localStorage.getItem("fight");this.hasFight=t!==null,this.render()}listenEvents(){window.addEventListener("new-fight",()=>{this.hasFight=!1,localStorage.removeItem("fight"),this.render()}),window.addEventListener("fight-create",t=>{const n=t.detail;localStorage.setItem("fight",JSON.stringify(n)),this.hasFight=!0,this.render()})}render(){this.shadowRoot.innerHTML="";const t=document.createElement(this.hasFight?"kfcb-fight":"kfcb-newfight");this.hasFight,this.shadowRoot.appendChild(t)}}customElements.define("kfcb-app",p);class u extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});const e=document.createElement("template");e.innerHTML=`
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
        `,this.shadowRoot.appendChild(e.content.cloneNode(!0)),this.shadowRoot.querySelector("#new-fight").addEventListener("click",()=>window.dispatchEvent(new Event("new-fight")))}}customElements.define("kfcb-header",u);let m=class extends HTMLElement{constructor(){super();o(this,"_score1");o(this,"_score2");o(this,"fight",null);this.attachShadow({mode:"open"}),this.loadFight()}loadFight(){const t=localStorage.getItem("fight");this.fight=t?JSON.parse(t):null,this.render()}render(){var n,i,s,a;if(!this.fight)return;const t=document.createElement("template");t.innerHTML=`
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
        `,this.shadowRoot.appendChild(t.content.cloneNode(!0)),this._score1=document.createElement("kfcb-score"),this._score2=document.createElement("kfcb-score"),(i=(n=this.shadowRoot)==null?void 0:n.querySelector(".score"))==null||i.appendChild(this._score1),(a=(s=this.shadowRoot)==null?void 0:s.querySelector(".score"))==null||a.appendChild(this._score2)}};customElements.define("kfcb-fight",m);let h=class{constructor(e,t,n){o(this,"point");o(this,"advantage");o(this,"penality");this.point=e||0,this.advantage=t||0,this.penality=n||0}};class g{constructor(e,t,n,i,s){o(this,"fighter1");o(this,"scoreFighter1");o(this,"fighter2");o(this,"scoreFighter2");o(this,"timer");this.fighter1=e,this.fighter2=t,this.timer=n||60,this.scoreFighter1=i||new h,this.scoreFighter2=s||new h}}class d{constructor(e){o(this,"name");this.name=e}}class f extends HTMLElement{constructor(){super();o(this,"score",new h);this.attachShadow({mode:"open"});const t=document.createElement("template");t.innerHTML=`
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
        `,this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.setupListeners(),this.updateUI()}setupListeners(){["point","advantage","penality"].forEach(t=>{var n,i;(n=this.shadowRoot.querySelector(`#${t}-inc`))==null||n.addEventListener("click",()=>this.updateValue(t,1)),(i=this.shadowRoot.querySelector(`#${t}-dec`))==null||i.addEventListener("click",()=>this.updateValue(t,-1))})}updateValue(t,n){this.score[t]+=n,this.updateUI(),this.dispatchEvent(new CustomEvent("value-changed",{detail:{...this.score},bubbles:!0,composed:!0}))}updateUI(){["point","advantage","penality"].forEach(t=>{this.shadowRoot.querySelector(`#${t}-val`).textContent=this.score[t].toString()})}}customElements.define("kfcb-score",f);class v extends HTMLElement{constructor(){super();o(this,"timerElement");o(this,"toggleButton");o(this,"duration");o(this,"timeLeft");o(this,"intervalId",null);o(this,"isPaused",!0);this.attachShadow({mode:"open"});const t=document.createElement("template");t.innerHTML=`
            <style>
                .timer {
                    font-size: 4rem;
                    text-align: center;
                    position: relative;
                }
                button:hover {
                    cursor: pointer;
                }
                svg {
                    fill: white;
                    width: 3rem;
                    height: 3rem;
                }

                #toggle{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: transparent;
                    color: transparent;
                    border: none;
                }
                @media (min-width: 576px) {
                    .timer {
                        font-size: 5rem;
                    }
                    svg {
                        width: 4rem;
                        height: 4rem;
                    }
                }
                @media (min-width: 768px) {
                    .timer {
                        font-size: 7rem;
                    }
                    svg {
                        width: 6rem;
                        height: 6rem;
                    }
                }
            </style>
            <div class="timer">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="0 0 1064 1280">
                    <path
                        d="M449.5 1.2C443 3.5 437.1 8.9 434 15.5c-1.9 3.8-2 7.1-2 67.3 0 70-.3 66.5 6.7 74.2 6.8 7.6 9.8 8.4 33.1 8.8l20.2.4v51.6l-7.2.7c-104.8 9.6-203.6 49.1-284.1 113.7-5.3 4.3-10.1 7.8-10.5 7.8-.4 0-3.6-2.8-7-6.3l-6.2-6.2 9.1-9c11.4-11.4 13.1-14 13.1-20.9 0-4.1-.6-6.5-2.5-9.8-3.7-6.3-60.4-62.4-64.9-64.3-4.9-2-10.4-1.9-15.3.4s-79.9 77.2-81.4 81.4c-1.6 4-1.3 10.2.4 14.5 2 4.6 57.9 61.1 64.3 64.9 4.8 2.9 13.1 3.4 17.4 1.2 1.2-.6 6.8-5.6 12.3-11l10.1-9.9 5.9 6 5.9 5.9-8.5 8.8C94.7 436 54.3 503.1 29 575.2 5.5 641.6-4.2 720.6 2 793.5c13 150.8 89.1 288.2 210.5 379.7 79.9 60.3 173.2 95.8 275.5 105 18.7 1.6 69.3 1.6 88 0 91.4-8.2 173.5-36.6 248-85.7C938.5 1117 1019.5 1001 1050 869c20.3-87.7 18.2-178.1-6.2-265.8-13.6-49.2-38.2-102.8-67.3-147.1C942 403.6 895 354.4 844 317.5c-57.7-41.8-122.3-71.2-191.5-87.3-23.7-5.6-54.4-10.4-75.2-11.8l-10.3-.7v-51.5l20.3-.4c23.2-.4 26.2-1.2 33-8.8 7-7.7 6.7-4.2 6.7-74.2 0-71 .3-67.5-7.4-75.1-8-7.7-1.9-7.2-89.1-7.4-52.7-.1-79 .2-81 .9zm119.2 296.3c97.1 8.3 185.4 45.2 258.8 108.4 73.2 63 125.4 149.9 145.9 243.1 8.1 36.8 10.1 56.2 10.1 99 0 38-.8 48.9-6.1 79-19.1 109.9-79.7 209.9-168.9 279-57.2 44.3-127 75.2-197.5 87.4-31.1 5.4-40 6.1-79 6.1s-47.9-.7-79-6.1c-111.8-19.4-214.3-82.5-283.1-174.4-48.6-64.8-77.4-137.4-87.6-221-2.6-20.8-2.5-79.3 0-100 8.9-71.7 30.3-132.6 67-191 54.3-86.2 138.2-152.8 234.2-186 59-20.4 124.3-28.7 185.2-23.5z" />
                    <path
                        d="M527 344v24h10v-48h-10v24zM318 377.2c-1.9 1.2-3.6 2.3-3.8 2.4-.2.1 21.7 38.7 23.4 41.2.5.7 8.4-3.9 8.4-4.9 0-1.4-23-40.9-23.8-40.9-.4 0-2.3 1-4.2 2.2zM729.6 395.6c-6.5 11.3-11.7 20.6-11.5 20.8 2 1.5 8.1 4.7 8.3 4.5 1.1-1.3 23.7-41.1 23.4-41.3-1.2-.9-7.6-4.6-7.9-4.6-.3 0-5.8 9.3-12.3 20.6zM524.7 401.2l-7.5 14.3-1.1 44c-.6 24.2-1.6 59.3-2.1 78-1.8 61.1-2.9 103.5-3.6 130.3l-.7 26.3-5.4 2.6c-17.4 8.6-30.4 29.8-30.5 50.2-.2 16.2 5 29.6 15.6 40.9 11.8 12.5 25.8 18.6 42.6 18.6s30.8-6.1 42.6-18.6c14.7-15.6 19.6-37.9 12.7-58-1.6-4.6-4.6-11-6.7-14.1-4.9-7.3-14-15.6-21.1-19.1l-5.5-2.7v-5.7c0-3.1-1.6-65.9-3.5-139.4L547 415.1l-7-14.1c-3.9-7.7-7.2-14-7.4-14-.3 0-3.8 6.4-7.9 14.2zm16.1 330.5c7.1 3.3 11.4 13.2 9.3 21-2.2 8-10.1 14.3-18.1 14.3-4.8 0-11-3.1-14.3-6.9-3.1-3.8-5.1-10.3-4.3-14.4 2.7-13.4 15.1-19.8 27.4-14zM162.1 533.4c-1.2 1.8-2.1 3.7-2.1 4.2 0 1 38.9 23.7 40.4 23.6.5 0 1.9-1.8 3.2-3.9l2.3-3.9-20.3-11.7c-11.2-6.4-20.6-11.7-20.9-11.7-.3 0-1.5 1.5-2.6 3.4zM879 541.4c-10.7 6.2-19.5 11.7-19.7 12.2-.2.5.7 2.6 2 4.6l2.2 3.7 13.5-7.8c7.4-4.2 16.7-9.6 20.7-11.9l7.1-4.2-2.1-4c-1.2-2.2-2.6-4-3.2-3.9-.5 0-9.8 5.1-20.5 11.3zM104.9 742.7c-.4 1.5 0 9.3.5 9.3H152v-9.5h-23.5c-12.9 0-23.5.1-23.6.2zM912 747.2v4.8h48.1l-.3-4.5-.3-4.6-23.8-.2-23.7-.2v4.7zM180.5 944.7c-11 6.3-20.2 11.6-20.3 11.8-.6.6.8 3.9 2.7 6.4l1.8 2.4 20.6-11.9 20.6-11.9-2.1-3.5c-1.2-1.9-2.4-3.8-2.7-4.2-.3-.4-9.6 4.5-20.6 10.9zM861.1 937.1c-1.3 2.2-1.9 4.4-1.5 4.9 1.4 1.3 39.3 23 40.1 23 .5 0 1.8-1.8 3-4l2.1-4-9.6-5.7c-5.3-3.1-14.6-8.5-20.5-12-6-3.4-11-6.3-11.1-6.3-.1 0-1.3 1.8-2.5 4.1zM325.8 1094.6l-11.7 20.5 4.1 2.5c2.2 1.4 4.4 2.2 4.8 1.7 1.2-1.3 23-39.5 23-40.3 0-.6-7.3-5.1-8.1-5-.2.1-5.7 9.3-12.1 20.6zM722 1076.2c-1.9 1.2-3.7 2.3-3.9 2.4-.2.2 22.4 40 23.5 41.3.2.2 6.2-3 8.3-4.5.4-.4-23.2-41.4-23.9-41.4-.3 0-2.1 1-4 2.2zM527 1151v24h10v-48h-10v24z" />
                </svg>
                <span id="time"></span>
                <div class="timer__controls">
                    <button id="toggle">start</button>
                </div>
            </div>
        `,this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.initializeComponent()}initializeComponent(){const t=this.getAttribute("time");this.duration=t?parseInt(t,10):60,this.timeLeft=this.duration,this.timerElement=this.shadowRoot.getElementById("time"),this.toggleButton=this.shadowRoot.getElementById("toggle"),this.toggleButton.addEventListener("click",()=>this.toggle()),this.updateDisplay()}static get observedAttributes(){return["time"]}attributeChangedCallback(t,n,i){t==="time"&&n!==i&&(this.duration=parseInt(i,10))}toggle(){this.intervalId===null?this.start():this.pause()}start(){this.isPaused=!1,this.toggleButton.textContent="pause",this.intervalId=window.setInterval(()=>{!this.isPaused&&this.timeLeft>0&&(this.timeLeft--,this.updateDisplay(),this.timeLeft<=0&&(this.stop(),this.dispatchEvent(new CustomEvent("timer-finished",{bubbles:!0,composed:!0}))))},1e3)}pause(){this.isPaused=!0,this.toggleButton.textContent="start",this.intervalId!==null&&(clearInterval(this.intervalId),this.intervalId=null)}stop(){this.pause(),this.timeLeft=0,this.updateDisplay()}updateDisplay(){const t=Math.floor(this.timeLeft/60),n=this.timeLeft%60;this.timerElement.textContent=`${t.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}`}}customElements.define("kfcb-timer",v);class b extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});const e=document.createElement("template");e.innerHTML=`
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
        `,this.shadowRoot.appendChild(e.content.cloneNode(!0)),this.shadowRoot.querySelector("#fight-form").addEventListener("submit",t=>this.createFight(t))}createFight(e){e.preventDefault();const t=this.shadowRoot.querySelector("[name=fighter1]").value.trim(),n=this.shadowRoot.querySelector("[name=fighter2]").value.trim(),i=this.shadowRoot.querySelector("[name=time]").value,s=new g(new d(t===""?"Combattant 1":t),new d(n===""?"Combattant 2":n),Number(i));window.dispatchEvent(new CustomEvent("fight-create",{detail:s}))}}customElements.define("kfcb-newfight",b);
