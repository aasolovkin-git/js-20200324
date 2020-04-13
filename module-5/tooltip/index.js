class Tooltip {
  static instance;

  element;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;

    this.render();
  }

  onPointerover = (event) => {
    var toolTipedElement = event.target && event.target.closest("[data-tooltip]");

    if (toolTipedElement) {
      this.element.textContent = toolTipedElement.dataset.tooltip;
      this.element.style.left = event.clientX + 10 + "px";
      this.element.style.top = event.clientY + 10 + "px";

      document.body.append(this.element);
    }
  };

  onPointerout  = (event) => {
    if (this.element.parentElement) {
      this.element.remove();
    }
  };

  onPointermove = (event) => {
    if (this.element.parentElement) {
      this.element.style.left = event.clientX + 10 + "px";
      this.element.style.top = event.clientY + 10 + "px";
    }
  };

  initEventListeners () {
    document.body.addEventListener("pointerover", this.onPointerover);
    document.body.addEventListener("pointerout", this.onPointerout);
    document.body.addEventListener("pointermove", this.onPointermove);
  }

  removeEventListeners () {
    document.body.removeEventListener("pointerover", this.onPointerover);
    document.body.removeEventListener("pointerout", this.onPointerout);
    document.body.removeEventListener("pointermove", this.onPointermove);
  }

  initialize () {
    this.initEventListeners();
  }

  get tooltipTemplate() {
    return `
    <div class="tooltip"></div>
    `;
  }

  render () {
    const element = document.createElement('div');
    element.innerHTML = this.tooltipTemplate;
    this.element = element.firstElementChild;
  }

  destroy () {
    this.removeEventListeners();
    this.element.remove();
  }
}

const tooltip = new Tooltip();

export default tooltip;
