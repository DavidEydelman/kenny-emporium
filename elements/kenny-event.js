/**
 * Copyright 2025 dcagliola
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `kenny-event`
 * Displays only the current week in calendar format
 *
 * @demo index.html
 * @element kenny-event
 */
export class KennyEvent extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "kenny-event";
  }

  constructor() {
    super();
    this.title = "Current Week";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Week View",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/kenny-event.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });

    // Get current date and calculate week
    this.currentDate = new Date();
    this.events = [];
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      currentDate: { type: Object },
      events: { type: Array },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchEvents();
  }

  async _fetchEvents() {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      this.events = Array.isArray(data) ? data : [];
    } catch (e) {
      console.warn("Failed to fetch events", e);
      this.events = [];
    }
  }

  /**
   * Get the start of the week (Sunday)
   */
  _getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  }

  /**
   * Get array of 7 days for current week
   */
  _getWeekDays() {
    const startOfWeek = this._getStartOfWeek(this.currentDate);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  }

  /**
   * Check if date is today
   */
  _isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  /**
   * Get day name (Sun, Mon, etc.)
   */
  _getDayName(date) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }

  /**
   * Get events for a specific date
   */
  _getEventsForDate(date) {
    return this.events.filter(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
  }

  /**
   * Navigate to previous week
   */
  _prevWeek() {
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() - 7);
    this.currentDate = newDate;
  }

  /**
   * Navigate to next week
   */
  _nextWeek() {
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() + 7);
    this.currentDate = newDate;
  }

  /**
   * Go to current week
   */
  _goToToday() {
    this.currentDate = new Date();
  }

  /**
   * Format date range for header
   */
  _getWeekRange() {
    const days = this._getWeekDays();
    const start = days[0];
    const end = days[6];
    
    return `${start.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric" 
    })} - ${end.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    })}`;
  }

  static get styles() {
    return [
      super.styles,
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

        h3 {
          margin: 0 0 var(--ddd-spacing-2) 0;
          font-size: var(--ddd-font-size-l);
        }

        .week-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--ddd-spacing-3);
          padding: var(--ddd-spacing-2);
          background-color: var(--ddd-theme-default-landgrantBrown);
          border-radius: 8px;
          border: 1px solid var(--ddd-theme-default-potentialMidnight);
        }

        .week-range {
          font-weight: bold;
          font-size: var(--ddd-font-size-m);
          color: var(--ddd-theme-primary);
        }

        .week-nav {
          display: flex;
          gap: var(--ddd-spacing-2);
        }

        button {
          padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
          background-color: var(--ddd-theme-default-potentialMidnight);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.2s;
        }

        button:hover {
          background-color: var(--ddd-theme-default-original87Pink);
        }

        button:active {
          transform: scale(0.98);
        }

        .today-button {
          background-color: var(--ddd-theme-default-potentialMidnight);
        }

        .today-button:hover {
          background-color: var(--ddd-theme-default-wonderPurple);
        }

        .week-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: var(--ddd-spacing-2);
        }

        .day-column {
          border: 1px solid var(--ddd-theme-default-potentialMidnight);
          border-radius: 8px;
          padding: var(--ddd-spacing-2);
          min-height: 150px;
          background-color: var(--ddd-theme-default-landgrantBrown);
          transition: box-shadow 0.2s;
        }

        .day-column:hover {
          box-shadow: var(--ddd-boxShadow-sm);
        }

        .day-column.today {
          border-color: var(--ddd-theme-default-potentialMidnight);
          border-width: 2px;
          background-color: var(--ddd-theme-default-landgrantBrown);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }

        .day-header {
          text-align: center;
          padding-bottom: var(--ddd-spacing-2);
          border-bottom: 1px solid var(--ddd-theme-default-potentialMidnight);
          margin-bottom: var(--ddd-spacing-2);
        }

        .day-name {
          font-weight: bold;
          font-size: var(--ddd-font-size-m);
          color: var(--ddd-theme-primary);
          display: block;
        }

        .day-number {
          font-size: 24px;
          font-weight: bold;
          color: var(--ddd-theme-primary);
          display: block;
          margin-top: var(--ddd-spacing-1);
        }

        .day-column.today .day-number {
          color: var(--ddd-theme-default-potentialMidnight);
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-1);
        }

        .event-item {
          font-size: var(--ddd-font-size-xs);
          background-color: var(--ddd-theme-default-skyLight);
          padding: var(--ddd-spacing-1);
          border-radius: 8px;
          border-left: 3px solid var(--ddd-theme-default-potentialMidnight);
          word-wrap: break-word;
        }

        .no-events {
          color: var(--ddd-theme-primary);
          font-style: italic;
          font-size: var(--ddd-font-size-xs);
          text-align: center;
          padding: var(--ddd-spacing-2);
        }

        @media (max-width: 1024px) {
          .week-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (max-width: 768px) {
          .week-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .week-header {
            flex-direction: column;
            gap: var(--ddd-spacing-2);
          }
        }

        @media (max-width: 480px) {
          .week-grid {
            grid-template-columns: 1fr;
          }
        }
      `,
    ];
  }

  render() {
    const weekDays = this._getWeekDays();

    return html`
      <div class="wrapper">
        <h3>${this.title}</h3>

        <div class="week-header">
          <div class="week-range">${this._getWeekRange()}</div>
          <div class="week-nav">
            <button @click=${this._prevWeek}>← Prev</button>
            <button class="today-button" @click=${this._goToToday}>
              Today
            </button>
            <button @click=${this._nextWeek}>Next →</button>
          </div>
        </div>

        <div class="week-grid">
          ${weekDays.map((day) => {
            const dayEvents = this._getEventsForDate(day);
            const isToday = this._isToday(day);

            return html`
              <div class="day-column ${isToday ? "today" : ""}">
                <div class="day-header">
                  <span class="day-name">${this._getDayName(day)}</span>
                  <span class="day-number">${day.getDate()}</span>
                </div>
                <div class="events-list">
                  ${dayEvents.length > 0
                    ? dayEvents.map(
                        (event) =>
                          html`<div class="event-item">${event.title}</div>`
                      )
                    : html`<div class="no-events">No events</div>`}
                </div>
              </div>
            `;
          })}
        </div>

        <slot></slot>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(KennyEvent.tag, KennyEvent);
