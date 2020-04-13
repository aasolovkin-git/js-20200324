export default class SortableTable {
  element;
  subElements = {};
  headersConfig = [];
  data = [];

  constructor(headersConfig, {
    data = [],
    sorted = {
      id: headersConfig.find(item => item.sortable).id,
      order: 'asc'
    }
  } = {}) {
    this.headersConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;

    this.render();
    this.initEventListeners();
  }

  get emptyPlaceholderTemplate() {
    return `
    <div data-elem="emptyPlaceholder" class="sortable-table__empty-placeholder">
      <div>
        <p>No products satisfies your filter criteria</p>
        <button type="button" class="button-primary-outline">Reset all filters</button>
      </div>
    </div>
    `;
  }

  get loadingTemplate() {
    return `<div data-elem="loading" class="loading-line sortable-table__loading-line"></div>`
  };

  get tableHeaderTempate() {
    return `
    <div data-elem="header" class="sortable-table__header sortable-table__row">
      ${ 
        this.headersConfig.map(item => `
          <div class="sortable-table__cell" data-name="${item.id}" ${item.sortable ? "data-sortable=\"\"": ""}>
            <span>${item.title}</span>
          </div>
          `).join("")
      }
    </div>
    `;
  }

  get headerCellSortArrowTemplate() {
    return `
    <span data-element="arrow" class="sortable-table__sort-arrow">
      <span class="sort-arrow"></span>
    </span>
    `;
  }

  getTableRecordTempate(dataItem) {
    return `
    <a href="/products/${dataItem}" class="sortable-table__row">
      ${ 
        this.headersConfig.map(headerItem => headerItem.template 
          ? headerItem.template(dataItem[headerItem.id]) 
          : `<div class="sortable-table__cell">${dataItem[headerItem.id]}</div>`).join("")
      }
    </a>
    `;
  }

  getTableBodyTempate(data) {
    return `
    <div data-elem="body" class="sortable-table__body">
      ${ data.map(item => this.getTableRecordTempate(item)).join("") }
    </div>
    `;
  }

  get tableContainerTemplate() {
    return `
    <div data-elem="productsContainer" class="products-list__container">
      <div class="sortable-table">
      ${this.tableHeaderTempate}
      ${this.getTableBodyTempate(this.data)}
      ${this.loadingTemplate}
      ${this.emptyPlaceholderTemplate}
      </div>
    </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.tableContainerTemplate;
    this.element = element.firstElementChild;

    this.element.querySelectorAll(".sortable-table [data-elem]").forEach(item => this.subElements[item.dataset.elem] = item);
  }

  createDataItemsComparator(field, order) {
    function comparator(dataItem1, dataItem2) {
      let result = 0;

      let  { sortable, sortType, sortingValuesCompare } = comparator.fieldHeaderInfo;
      
      if (!!sortable) {
        let value1 = dataItem1[comparator.field];
        let value2 = dataItem2[comparator.field];

        if (sortingValuesCompare instanceof Function) {
          result = sortingValuesCompare(value1, value2);
        } else {
          switch (sortType) {
            case 'string':
              result = (value1 || "").localeCompare((value2 || ""), 'default', {caseFirst: 'upper'});
              break; 

            case 'number':
              result = (parseFloat(value1) || 0) - (parseFloat(value2) || 0);
              break;
          }
        }
      }
      
      return comparator.order * result;
    }

    comparator.field = field;
    comparator.order = (order === "desc" ? -1 : 1);
    comparator.fieldHeaderInfo = this.headersConfig.find(item => item.id === field);
    
    return comparator;
  }

  setHeaderSortArrow(field, order) {
    this.subElements.header
      .querySelectorAll(".sortable-table__cell span.sortable-table__sort-arrow")
      .forEach(item => item.remove());

    this.subElements.header
      .querySelectorAll(".sortable-table__cell")
      .forEach(item => {
        if (item.dataset.name === field) {
          item.setAttribute("data-sortable", "true");
          item.setAttribute("data-order", order);
          item.insertAdjacentHTML("beforeEnd", this.headerCellSortArrowTemplate);
        } else {
          item.setAttribute("data-sortable", "");
          item.removeAttribute("data-order");
        }
      });
  }

  headerElementsClick = (event) => {
    let headerCell = event.target.closest(".sortable-table__cell");

    if (headerCell) {
      let { name: field, order } = headerCell.dataset;
      let newOrder = (order === "asc" ? "desc" : "asc");
      let { sortable } = this.headersConfig.find(item => item.id === field);
      
      if (!!sortable) {
        this.subElements.body.innerHTML = this.data
          .sort(this.createDataItemsComparator(field, newOrder))
          .map(item => this.getTableRecordTempate(item))
          .join("");
    
        this.setHeaderSortArrow(field, newOrder); 
      } 
    }
  }

  initEventListeners () {
    this.subElements.header.addEventListener("click", this.headerElementsClick);
  }

  removeEventListeners () {
    this.subElements.header.removeEventListener("click", this.headerElementsClick);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.removeEventListeners();
    this.remove();
    this.subElements = {};
  }
}
