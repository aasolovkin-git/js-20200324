export default class Page {
  element;
  subElements = {};
  components = {};

  constructor () {
    this.initComponents();
    this.render();
    this.initEventListeners();
  }

  initComponents () {
    // init all child components
    // this.component.componentName = new ComponentName();
  }

  get template () {
    return ``;
  }

  render () {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;

    this.renderComponents();
  }

  renderComponents () {
    // ...render all initialized components
  }

  initEventListeners () {
    // ...init page event listeners
  }

  destroy () {
    this.components.forEach(component => {
      component.destroy();
    });
  }
}
