import { LitElement } from "lit";

class KennyImageLoader extends LitElement {
  static get properties() {
    return {
      src: { type: String } // API endpoint
    };
  }

  constructor() {
    super();
    this.src = "/api/kenny-images.json";
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadImages();
  }

  async loadImages() {
    try {
      const res = await fetch(this.src);
      const images = await res.json();

      const carousel = this.closest("kenny-carousel") ||
        document.querySelector("kenny-carousel");

      if (!carousel) {
        console.warn("kenny-image: No <kenny-carousel> found.");
        return;
      }

      images.forEach((img, index) => {
        const fig = document.createElement("figure");
        fig.id = img.id;
        if (index === 0) fig.setAttribute("active", "");

        fig.innerHTML = `
          <img src="${img.src}" alt="${img.alt}">
          <figcaption>${img.caption}</figcaption>
        `;

        carousel.appendChild(fig);
      });

    } catch (err) {
      console.error("kenny-image: Failed to load images", err);
    }
  }
}

customElements.define("kenny-image", KennyImageLoader);
