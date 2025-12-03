/*
Component to make a social banner for the team.
*/
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

/**
 * `kenny-social`
 * Social Banner (a footer)
 * 
 * @demo index.html
 * @element kenny-social
 */
export class KennySocial extends DDDSuper(LitElement) {

  static get tag() {
    return "kenny-social";

  constructor() {
    super();
    this.year = new Date().getFullYear();
  }

  static get properties() {
    return {
      ...super.properties,
      year: { type: Number }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        background-color: var(--ddd-theme-default-navy80);
        color: var(--ddd-theme-default-white);
        margin-top: var(--ddd-spacing-8);
      }
      .footer-wrapper {
        max-width: 1200px;
        margin: 0 auto;
        padding: var(--ddd-spacing-4);
        text-align: center;
      }
      .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--ddd-spacing-4);
      }
      .social-links {
        display: flex;
        gap: var(--ddd-spacing-3);
      }
      .social-link {
        color: var(--ddd-theme-default-skyBlue);
        text-decoration: none;
        font-size: var(--ddd-font-size-l);
        transition: color 0.3s ease;
      }
      .social-link:hover {
        color: var(--ddd-theme-default-white);
      }
      .team-name {
        font-size: var(--ddd-font-size-m);
      }
    `];
  }

  render() {
    return html`
      <div class="social-wrapper">
        <div class="social-content">
          <div class="team-name">
            ${this.year} Kenny's Emporium
          </div>
          <div class="social-links">
            <a href="#" class="social-link"> Facebook</a>
            <a href="#" class="social-link"> Fortnite</a>
            <a href="#" class="social-link"> Instagram</a>
          </div>
        </div>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(KiwiFooter.tag, KiwiFooter);