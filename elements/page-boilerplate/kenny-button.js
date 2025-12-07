import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./kenny-animated.js";

/**
 * `kenny-button`
 * The code for all of our buttons, directing to different pages!
 * 
 * @demo index.html
 * @element kenny-button
 */
export class KennyButton extends DDDSuper(I18NMixin(LitElement)) {

    static get tag() {
        return "kenny-button";
    }

    constructor() {
        super();
        this.label = "";
        this.link = "/";
        this.isHovered = false;
    }

    // Lit reactive properties
    static get properties() {
        return {
            ...super.properties,
            label: { type: String },
            link: { type: String },
            isHovered: { type: Boolean, reflect: true }
        };
    }

    // Lit scoped styles
static get styles() {
    return [super.styles,
    css`
        :host {
            display: inline-block;
            position: relative;
        }
        .button-container {
            display: flex;
            align-items: center;
            gap: var(--ddd-spacing-2);
            padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
            background-color: var(--ddd-theme-default-beaver70);
            border: none;
            border-radius: var(--ddd-radius-sm);
            cursor: pointer;
            font-family: var(--ddd-font-navigation);
            font-size: var(--ddd-font-size-m);
            color: var(--ddd-theme-default-potentialMidnight);
            text-decoration: none;
            transition: background-color 0.3s ease;
        }
        .button-container:hover {
            background-color: var(--ddd-theme-default-beaver80);
        }
        .dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            min-width: 200px;
            background-color: var(--ddd-theme-default-white);
            border: 1px solid var(--ddd-theme-default-coalyGray);
            border-radius: var(--ddd-radius-sm);
            box-shadow: var(--ddd-boxShadow-md);
            display: none;
            flex-direction: column;
            z-index: 1000;
            margin-top: 0;
        }
        :host([is-hovered]) .dropdown {
            display: flex;
        }
        :host(:hover) .dropdown {
            display: flex;
        }
        ::slotted(a) {
            display: block;
            padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
            color: var(--ddd-theme-default-potentialMidnight);
            text-decoration: none;
            font-family: var(--ddd-font-navigation);
            font-size: var(--ddd-font-size-s);
            transition: background-color 0.2s ease;
            border-bottom: 1px solid var(--ddd-theme-default-limestoneGray);
        }
        ::slotted(a:last-child) {
            border-bottom: none;
        }
        ::slotted(a:hover) {
            background-color: var(--ddd-theme-default-limestoneLight);
        }
    `];
}

    _handleMouseEnter() {
        this.isHovered = true;
    }

    _handleMouseLeave() {
        this.isHovered = false;
    }

    _handleClick(e) {
        // Navigate to the main link
        window.dispatchEvent(new CustomEvent('navigate', {
            detail: { path: this.link },
            bubbles: true,
            composed: true
        }));
    }

    // Lit render the HTML
render() {
    return html`
        <div 
            class="hover-container"
            @mouseenter="${this._handleMouseEnter}"
            @mouseleave="${this._handleMouseLeave}">
            <a 
                class="button-container"
                href="${this.link}"
                @click="${this._handleClick}">
                <span>${this.label}</span>
                <kenny-animated 
                    .isHovered="${this.isHovered}"
                    src="elements/page-boilerplate/images/kenny-up.png"
                    hoveredSrc="elements/page-boilerplate/images/kenny-down.png">
                </kenny-animated>
            </a>
            <div class="dropdown">
                <slot></slot>
            </div>
        </div>
    `;
}
    }

globalThis.customElements.define(KennyButton.tag, KennyButton);