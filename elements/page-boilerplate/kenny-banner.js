import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `kenny-banner`
 * Banner at the top of each page, with buttons to direct you to different pages.
 * home button, schedule, team, about
 * 
 * @demo index.html
 * @element kenny-banner
 */
export class KennyBanner extends DDDSuper(I18NMixin(LitElement)) {
    static get tag() {
        return "kenny-banner";
    }

    constructor() {
        super();
    }

    // Lit reactive properties
    static get properties() {
        return {
            ...super.properties,
        };
    }

    // Lit scoped styles
    static get styles() {
        return [super.styles,
        css`
            :host {
                display: block;
                width: 100%;
                background-color: var(--ddd-theme-default-potentialMidnight);
            }
            .header {
                width: 100%;
                background-color: var(--ddd-theme-default-roarLight);
                padding: var(--ddd-spacing-4) var(--ddd-spacing-6);
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
            }
            .nav-left {
                display: flex;
                align-items: center;
                gap: var(--ddd-spacing-4);
            }
            .nav-right {
                display: flex;
                align-items: center;
                gap: var(--ddd-spacing-4);
            }
            ::slotted(kenny-logo) {
                display: block;
            }
            ::slotted(kenny-button) {
                display: inline-block;
            }
        `];
    }

    // Lit render the HTML
    render() {
        return html`
            <header class="header">
                <div class="nav-left">
                    <slot name="logo"></slot>
                </div>
                <div class="nav-right">
                    <slot name="buttons"></slot>
                </div>
            </header>
        `;
    }
}

globalThis.customElements.define(KennyBanner.tag, KennyBanner);