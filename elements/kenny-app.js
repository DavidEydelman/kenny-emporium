/**
 * Copyright 2025 dcagliola
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./page-boilerplate/kenny-page.js";
import "./kenny-calendar.js";
import "./kenny-carousel.js";
import "./kenny-event.js";
import "./kenny-image.js";
import "./kenny-roster.js";

/**
 * `kenny-app`
 * 
 * @demo index.html
 * @element kenny-app
 * 
 * Main routing component that uses kenny-page as boilerplate
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
      :host {
        display: block;
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
        </kenny-page>
      `;
    }
    
    if (this.route.startsWith("/team")) {
      return html`
        <kenny-page page="team">
          <h1>Meet the Team!</h1>
          <p>Our amazing players and staff who make everything possible.</p>
          <h2>Team Roster:</h2>
            <kenny-roster .members=${[
              { name: "Kevin", role: "Team Captain", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKDMvNNxt5xBaMjvH4fFjSuLmNmwlr9MZY0A&s" },
              { name: "Kelly", role: "Vice Captain", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjkNNc9V6GrtvTOEMKsBUnkzgxKAOIMc0b_A&s" },
              { name: "Kenigh", role: "Player", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMO5tBUmtPgMb0s0212UtvVugrNRSSF51XVQ&s" },
              { name: "Katie", role: "Player", image: "https://i.pinimg.com/736x/aa/85/8c/aa858cf7bc1e60cacee74d86a4f3c642.jpg" },
              { name: "Kole", role: "Player", image: "https://yt3.googleusercontent.com/tZEE4MH8dd40YIJVPmnAIklUf9K0bQMjtixoC0eGRXAZw0WkgkqqvPSMb-Bz89LIulDuQYVZlYg=s900-c-k-c0x00ffffff-no-rj" },
            ]}></kenny-roster>
          <h2>Coaches:</h2>
            <kenny-roster .members=${[
              { name: "Kenny", role: "Head Coach", image: "https://pbs.twimg.com/media/EY8h23uX0AAjg7L.jpg" },
              { name: "Knox", role: "Assistant Coach", image: "https://www.whosampled.com/static/images/media/track_images_200/lr157999_2022719_19376551213.jpg" },
            ]}></kenny-roster>
        </kenny-page>
      `;
    }
    
    if (this.route.startsWith("/about")) {
      return html`
        <kenny-page page="about">
          <h2>About Kenny Sports</h2>
          <p>Kenny Sports is dedicated to promoting sportsmanship, teamwork, and excellence in athletics. 
            Our mission is to provide a supportive environment for athletes of all levels to grow and succeed.</p>
          <kenny-carousel>
            <kenny-image src="/api/kenny-images.json"></kenny-image>
          </kenny-carousel>
          <h2>Contact Us!</h2>
          <p>
             Email: kennysportsinc@gmail.com <br>
             Phone: (555) 123-4567 <br>
             Address: 1234 Sports Lane, Athletic City, AS 56789 <br>
          </p>
        </kenny-page>
      `;
    }
    
    // Default home page
    return html`
      <kenny-page page="home">
        <h2>Welcome to Kenny Sports!</h2>

        <kenny-carousel>
          <kenny-image src="/api/kenny-images.json"></kenny-image>
        </kenny-carousel>

        <p>Check out our upcoming events:</p>
        <kenny-event></kenny-event>
      </kenny-page>
    `;
  }

  // Lit render the HTML
  render() {
    return html`${this.renderPage()}`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(KennyApp.tag, KennyApp);