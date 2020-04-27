export default class DoubleSlider {
  element;
  subElements = {};

  constructor ({
     min = 100,
     max = 200,
     formatValue = value => '$' + value,
     selected = {
       from: min,
       to: max
     }
   } = {}) {
    this.min = min;
    this.max = max;
    this.formatValue = formatValue;
    this.selected = selected;

    this.render();
  }

  get template () {
    // ... template
  }

  render() {
    // ... logic
  }

  initEventListeners () {
    // ... logic
  }

  getSubElements (element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // ...clear event listeners
  }
}
