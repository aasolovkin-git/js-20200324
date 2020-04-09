export default class SortableTable {
  element;
  subElements = {};
  headersConfig = [];
  data = [];

  constructor(headersConfig, {
    data = []
  } = {}) {
    this.headersConfig = headersConfig;
    this.data = data;

    this.render();
  }

  render() {

  }

  sort (field, order) {

  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}

