export default class RangePicker {
  element;
  subElements = {};
  // TODO: rename "selectingFrom"
  selectingFrom = true;
  selected = {
    from: new Date(),
    to: new Date()
  };

  constructor({
    from = new Date(),
    to = new Date()} = {}
  ) {
    this.showDateFrom = new Date(from);
    this.selected = {from, to};

    this.render();
  }

  get template () {
    // ...template here
  }

  render() {
    // ...logic here
    this.initEventListeners();
  }

  getSubElements (element) {
    const subElements = {};

    for (const subElement of element.querySelectorAll('[data-elem]')) {
      subElements[subElement.dataset.elem] = subElement;
    }

    return subElements;
  }

  initEventListeners () {
    // ...logic here
  }

  remove () {
    this.element.remove();
    // ...logic here
  }

  destroy() {
    this.remove();
    // ...logic here
  }
}
