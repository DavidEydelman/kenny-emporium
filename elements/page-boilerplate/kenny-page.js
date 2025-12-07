/*
Component to use for each page
*/
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "../kenny-social.js";
import "./kenny-banner.js";

/**
 * `kenny-page`
 * Component to use for each page
 * 
 * @demo index.html
 * @element kenny-page
 */
export class KennyPage extends DDDSuper(I18NMixin(LitElement)) {

    static get tag() {
        return "kenny-page";
    }

    constructor() {
        super();
        this.page = "home";
    }

    // Lit reactive properties
    static get properties() {
        return {
            ...super.properties,
            page: { type: String },
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
        h2 span {
            font-size: var(--kenny-page-label-font-size, var(--ddd-font-size-m));
        }
    `];
    }

    // Lit render the HTML
    render() {
        return html`
            <div class="wrapper">
            <h2><span>${this.t.page}:</span> ${this.page}</h2>
            <slot></slot>
            </div>`;
    }
}

globalThis.customElements.define(KennyPage.tag, KennyPage);
