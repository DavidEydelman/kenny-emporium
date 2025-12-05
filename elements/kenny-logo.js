import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `kenny-logo`
 * The code for our logo/home button in the top right
 * 
 * @demo index.html
 * @element kenny-logo
 */
export class KennyLogo extends DDDSuper(I18NMixin(LitElement)) {

    static get tag() {
        return "kenny-logo";
    }

    constructor() {
        super();
    }

    // Lit reactive properties
    static get properties() {
        return {
            ...super.properties,
            title: { type: String },
        };
    }

    // Lit scoped styles
    static get styles() {
        return [super.styles,
        css`
        :host {
            display: block;
            color: var(--ddd-theme-primary);
            background-color: var(--ddd-theme-accent);
            font-family: var(--ddd-font-navigation);
        }
        .wrapper {
            margin: var(--ddd-spacing-2);
            padding: var(--ddd-spacing-4);
        }
        h3 span {
            font-size: var(--kenny-logo-label-font-size, var(--ddd-font-size-s));
        }
    `];
    }

    // Lit render the HTML
    render() {
        return html`
            <div class="wrapper">
            <h3><span>${this.t.title}:</span> ${this.title}</h3>
            <slot></slot>
            </div>`;
    }
}

globalThis.customElements.define(KennyLogo.tag, KennyLogo);