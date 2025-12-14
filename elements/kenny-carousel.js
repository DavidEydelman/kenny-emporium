import { LitElement, html, css } from "lit";

// Image imports like kenny-app.js
const kennyPic1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4u0bK8cSiFAxeVoxocnokGwQBlHQsqpPtGA&s";
const kennyPic2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjkNNc9V6GrtvTOEMKsBUnkzgxKAOIMc0b_A&s";
const kennyPic3 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuHacROL6YTfb0CKIGBmpkemzv5BZskH4FIw&s";
const kennyPic4 = "https://media-cdn.tripadvisor.com/media/photo-s/00/13/b8/06/kenny-the-kangaroo-kennywoods.jpg";
const kennyPic5 = "https://media.australian.museum/media/dd/thumbnails/images/Red_Kangaroo_Peter_and_Shelly_some_rights_res.width-1200.c03bc40.jpg";

export class KennyCarousel extends LitElement {
  static properties = {
    images: { type: Array },
    selectedIndex: { type: Number },
  };

  constructor() {
    super();
    this.selectedIndex = 0;
    this.images = [
      { src: kennyPic1, caption: "Kenny celebrating a win!" },
      { src: kennyPic2, caption: "Kenny training hard!" },
      { src: kennyPic3, caption: "Kenny posing with the team!" },
      { src: kennyPic4, caption: "Kenny enjoying a day out!" },
      { src: kennyPic5, caption: "Kenny's Dad" },
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

    .caption {
      position: absolute;
      padding: 8px;
      font-size: 16px;
      color: var(--ddd-theme-default-potentialMidnight);
    }

    .slide {
      position: relative;
      display: none;
      width: 100%;
      max-width: 400px;
      aspect-ratio: 4 / 3;
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

    /* Buttons stay inside the slide */
    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: var(--ddd-theme-accent);
      border: none;
      font-size: 22px;
      padding: 6px 10px;
      cursor: pointer;
      color: var(--bg-color);
      border-radius: 50%;
      opacity: 0.85;
    }

    button.prev {
      left: 8px;
    }

    button.next {
      right: 8px;
    }

  `;

render() {
  return html`
    ${this.images.map(
      (item, index) => html`
        <div class="slide ${index === this.selectedIndex ? 'active' : ''}">
          <img src="${item.src}" alt="Kenny Image ${index + 1}" />
          <div class="caption">${item.caption}</div>
        </div>
      `
    )}

    <button class="prev" @click=${this.prev}>&lt;</button>
    <button class="next" @click=${this.next}>&gt;</button>
  `;
}

  connectedCallback() {
    super.connectedCallback();
    this.startAutoSlide();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timer);
  }

  startAutoSlide() {
    this._timer = setInterval(() => {
      this.next();
    }, 10000); // 1000ms = 1 second
  }

  resetTimer() {
    clearInterval(this._timer);
    this.startAutoSlide();
  }

  prev() {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.images.length) % this.images.length;
    this.resetTimer();
  }

  next() {
    this.selectedIndex =
      (this.selectedIndex + 1) % this.images.length;
    this.resetTimer();
  }
}

customElements.define("kenny-carousel", KennyCarousel);
