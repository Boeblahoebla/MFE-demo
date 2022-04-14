import styles from "./style.css";

class MfeDemo extends HTMLElement {
    static get observedAttributes() {
        return ["game"]
    }

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "open" })
        this.data = {}
        this.game = null;
    }

    async attributeChangedCallback(name, oldValue, newValue) {
        console.log("%cattributeChangedCallback triggered","color:purple");
        console.log("oldValue,", oldValue);
        console.log("newValue,", newValue);

        if (name === "game" && newValue && oldValue !== newValue) {
            this.game = newValue;

            this.dispatchEvent(new CustomEvent("MFE-loading-game", {
                detail: "... loading",
                bubbles: true,
                composed: true
            }))

            await this._fetchData()
            this._render()
        }
    }

    async connectedCallback() {
        console.log("%cConnectedCallback triggered","color:green");
        this.isRendered = true
        console.log("this.isRendered",this.isRendered);
    }

    disconnectedCallback() {
        this.isRendered = false
    }

    async _render() {
        this.shadow.innerHTML = `
            <style>
              ${styles}
            </style>

            <div class="content">
                <h1>Gaming 1 - MFE environment</h1>
                <h4>Chosen game = ${this.game}</h4>
                <p>${JSON.stringify(this.data)}</p>
            </div>
        `;

        this.dispatchEvent(new CustomEvent("MFE-game-loaded", {
            detail: this.game,
            bubbles: true,
            composed: true
        }))
    }

    async _fetchData() {
        const response = await fetch(`http://localhost:8080`)
        this.data = await response.json()
    }
}

customElements.define('mfe-demo', MfeDemo)
