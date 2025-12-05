import { LitElement, html, css } from "lit";

class KennyCarousel extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      margin: 15px 0;
    }
    ::slotted(figure) {
      display: none;
      margin: 0 auto;
      text-align: center;
      width: 400px;
      height: 300px;
      overflow: hidden;
      border: 1px solid var(--ddd-theme-default-potentialMidnight);
      border-radius: 8px;
      background-color: var(--ddd-theme-default-beaver70);
    }
    ::slotted(figure[active]) {
      display: block;
    }
    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: var(---ddd-theme-accent);
      border: none;
      color: var(--ddd-theme-primary);
      font-size: 24px;
      padding: 8px 12px;
      cursor: pointer;
    }
    button.prev { left: 0; }
    button.next { right: 0; }
  `;

  static properties = {
    selectedIndex: { type: Number }
  };

  constructor() {
    super();
    this.selectedIndex = 0;
  }

  render() {
    const items = Array.from(this.querySelectorAll("figure"));
    items.forEach((f, i) => f.toggleAttribute("active", i === this.selectedIndex));

    return html`
      <slot></slot>
      <button class="prev" @click=${this.prev}>&lt;</button>
      <button class="next" @click=${this.next}>&gt;</button>
    `;
  }

  prev() {
    const items = this.querySelectorAll("figure");
    this.selectedIndex = (this.selectedIndex - 1 + items.length) % items.length;
    this.requestUpdate();
  }

  next() {
    const items = this.querySelectorAll("figure");
    this.selectedIndex = (this.selectedIndex + 1) % items.length;
    this.requestUpdate();
  }
}

customElements.define("kenny-carousel", KennyCarousel);
