/**
 * Copyright 2025 dcagliola
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./page-boilerplate/kenny-page.js";
import "./page-boilerplate/kenny-banner.js";
import "./page-boilerplate/kenny-animated.js";
import "./page-boilerplate/kenny-button.js";
import "./kenny-calendar.js";
import "./kenny-carousel.js";
import "./kenny-event.js";
import "./kenny-social.js";
import "./kenny-image.js";
const kennyHome1 = new URL("./page-boilerplate/images/kenny-home1.png", import.meta.url).href;
const kennyHome2 = new URL("./page-boilerplate/images/kenny-home2.png", import.meta.url).href;

/**
 * `kenny-app`
 * 
 * @demo index.html
 * @element kenny-app
 * 
 * Compiles all the different components to one .js file
 * for simpler html.
 */
export class KennyApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "kenny-app";
  }

  constructor() {
    super();
    this.route = window.location.pathname || "/";
    this.initRouting();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      route: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
       /* Light Theme */
      :host {
        --bg-color: var(--ddd-theme-default-shrineTan);
        --text-color: var(--ddd-theme-default-landgrantBrown);
      }

      /* Dark Theme */
      @media(prefers-color-scheme: dark) {
        :host {
          --bg-color: var(--ddd-theme-default-landgrantBrown);
          --text-color: var(--ddd-theme-default-roarLight);
        }
      }

      :host {
        display: block;
        color: var(--text-color);
        background-color: var(--bg-color);
        font-family: var(--ddd-font-navigation);
        border-radius: var(--ddd-radius-lg);
      }
      .body{
        padding: var(--ddd-spacing-4);
        margin: 0;
      }
      h3 span {
        font-size: var(--kenny-app-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  initRouting() {
    // Handle initial page load
    this.route = window.location.pathname;
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.route = window.location.pathname;
    });
  }

  handleNavigation(e) {
    if (e.detail && e.detail.path) {
      this.route = e.detail.path;
      window.history.pushState({}, "", e.detail.path);
    }
  }

  renderPage() {
      if (this.route.startsWith("/schedule")) {
        return html`
        <kenny-page page="schedule">
          <h2>Full Schedule</h2>
          <kenny-calendar></kenny-calendar>

          <p>Events coming up!</p>
          <kenny-event></kenny-event>
          <kenny-event></kenny-event>
          <kenny-event></kenny-event>
        </kenny-page>`;
      }
      if (this.route.startsWith("/team")) {
        return html`
        <kenny-page page="team">
          <h2>Meet the Team!</h2>
          <p>Our amazing players and staff who make everything possible.</p>
          <kenny-image src="/api/kenny-images.json"></kenny-image>
        </kenny-page>`;
      }
      if (this.route.startsWith("/about")) {
        return html`
        <kenny-page page="about">
          <h2>About Kenny Sports</h2>
          <p>Kenny Sports is dedicated to promoting sportsmanship, teamwork, and excellence in athletics. 
            Our mission is to provide a supportive environment for athletes of all levels to grow and succeed.</p>
          <kenny-image src="/api/kenny-images.json"></kenny-image>
        </kenny-page>`;
      }
        return html`
          <kenny-page page="home">
            <h2>Welcome to Kenny Sports!</h2>

            <kenny-carousel>
              <kenny-image src="/api/kenny-images.json"></kenny-image>
            </kenny-carousel>

            <p>Check out our upcoming events:</p>
            <kenny-calendar></kenny-calendar>
          </kenny-page>
        `;

    }
  // Lit render the HTML
  render() {
    return html`
      <div class="header">
        <kenny-banner>
          <kenny-animated 
            link="/home"
            slot="logo" 
            src="${kennyHome1}"
            hoveredSrc="${kennyHome2}">
          </kenny-animated>
          <kenny-button slot="buttons" label="Schedule" link="/schedule">
            <a href="/schedule">Schedule Page</a>
            <a href="/schedule/games">Games</a>
            <a href="/schedule/practice">Practice</a>
          </kenny-button>
          <kenny-button slot="buttons" label="Team" link="/team">
            <a href="/team">Team Page</a>
            <a href="/team/roster">Roster</a>
            <a href="/team/coaches">Coaches</a>
          </kenny-button>
          <kenny-button slot="buttons" label="About" link="/about">
            <a href="/about">About Page</a>
            <a href="/team/Contact">Contact</a>
            <a href="/team/mission_statement">Mission Statement</a>
          </kenny-button>
        </kenny-banner>
      </div>

      <div class="body">
        ${this.renderPage()}
      </div>

      <div class="footer">
         <kenny-social></kenny-social>
      </div>
    `;
  }
  

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(KennyApp.tag, KennyApp);