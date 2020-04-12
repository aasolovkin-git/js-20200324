class Tooltip {
  static instance;

  element;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

  initEventListeners () {

  }

  initialize () {

  }

  render () {

  }

  destroy () {

  }
}

const tooltip = new Tooltip();

export default tooltip;
