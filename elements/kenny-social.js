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
  }
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
          width: 100%;
          margin-top: auto; 
          background-color: var(--bg-color);
          color: var(--text-color);
        }

        /* Light Theme */
        :host {
          --bg-color: var(--ddd-theme-default-roarLight);
          --text-color: var(--ddd-theme-default-potentialMidnight);
          --link-color: var(--ddd-theme-default-landgrantBrown);
        }

        /* Dark Theme */
        @media(prefers-color-scheme: dark) {
          :host {
            --bg-color: var(--ddd-theme-default-shrineTan);
            --text-color: var(--ddd-theme-default-roarLight);
            --link-color: var(--ddd-theme-default-landgrantBrown);
          }
        }

        .social-wrapper {
          max-width: 1200px;
          padding: var(--ddd-spacing-4);
          text-align: center;
        }

        .social-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: nowrap; /* prevents wrapping from breaking alignment */
          gap: var(--ddd-spacing-2);
        }


        .social-links {
          display: flex;
          gap: var(--ddd-spacing-8);
        }

        .social-link {
          color: var(--link-color);
          text-decoration: none;
          font-size: var(--ddd-font-size-l);
          transition: color 0.3s ease;
        }

        .social-link:hover {
          color: var(--text-color);
        }

        .team-name {
          font-size: var(--ddd-font-size-m);
        }

        @media (max-width: 600px) {

        .social-content {
          flex-direction: column;
          text-align: center;
          gap: var(--ddd-spacing-2);
        }

        .team-name {
          font-size: var(--ddd-font-size-s);
        }

        .social-links {
          gap: var(--ddd-spacing-4);
        }

        .social-link {
          font-size: var(--ddd-font-size-m);
        }
        }

    `];
    }

  render() {
    return html`
      <div class="social-wrapper">
        <div class="social-content">
          <div class="team-name">
           © ${this.year} Kenny's Emporium
          </div>
          <div class="social-links">
            <a href="https://hax.psu.edu/" class="social-link"> Facebook</a>
            <a href="https://hax.psu.edu/" class="social-link"> Instagram</a>
            <a href="https://hax.psu.edu/" class="social-link"> Twitter</a>
          </div>
        </div>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(KennySocial.tag, KennySocial);