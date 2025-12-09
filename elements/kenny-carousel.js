import { LitElement, html, css } from "lit";

// Image imports like kenny-app.js
const kennyHome1 = new URL("./page-boilerplate/images/kenny-home1.png", import.meta.url).href;
const kennyHome2 = new URL("./page-boilerplate/images/kenny-home2.png", import.meta.url).href;
const kennyDown  = new URL("./page-boilerplate/images/kenny-down.png",  import.meta.url).href;


export class KennyCarousel extends LitElement {
  static properties = {
    images: { type: Array },
    selectedIndex: { type: Number },
  };

  constructor() {
    super();
    this.selectedIndex = 0;

    // Default images (like kenny-app)
    this.images = [
      kennyHome1,
      kennyHome2,
      kennyDown,
    ];
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      margin: 15px 0;
    }

    /* Light Theme */
    :host {
      --bg-color: var(--ddd-theme-default-landgrantBrown);
      --text-color: var(--ddd-theme-default-roarLight);
      --border-color: var(--ddd-theme-default-potentialMidnight);
    }

    /* Dark Theme */
    @media(prefers-color-scheme: dark) {
      :host {
        --bg-color: var(--ddd-theme-default-shrineTan);
        --text-color: var(--ddd-theme-default-potentialMidnight);
        --border-color: var(--ddd-theme-default-roarLight);
      }
    }

    .slide {
      display: none;
      width: 400px;
      height: 300px;
      margin: 0 auto;
      overflow: hidden;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background-color: var(--bg-color);
      color: var(--text-color);
      text-align: center;
    }

    .slide.active {
      display: block;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: var(--ddd-theme-accent);
      border: none;
      font-size: 24px;
      padding: 8px 12px;
      cursor: pointer;
      color: var(--bg-color);
    }

    button.prev { left: 0; }
    button.next { right: 0; }
  `;

  render() {
    return html`
      ${this.images.map(
        (src, index) => html`
          <div class="slide ${index === this.selectedIndex ? 'active' : ''}">
            <img src="${src}" alt="Kenny Image ${index + 1}" />
          </div>
        `
      )}

      <button class="prev" @click=${this.prev}>&lt;</button>
      <button class="next" @click=${this.next}>&gt;</button>
    `;
  }

  prev() {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.images.length) % this.images.length;
  }

  next() {
    this.selectedIndex =
      (this.selectedIndex + 1) % this.images.length;
  }
}

customElements.define("kenny-carousel", KennyCarousel);
