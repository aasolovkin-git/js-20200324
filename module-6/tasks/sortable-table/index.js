import fetchJson from "./../../../utils/fetch-json.js";

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class SortableTable {
  element;
  sortArrowElement;
  subElements = {};
  headersConfig = [];
  data = [];
  pageSize = 30;

  constructor(headersConfig, {
    url = '',
    data = [],
    sorted = {
      id: headersConfig.find(item => item.sortable).id,
      order: 'asc'
    },
    isSortLocally = false
  } = {}) {
    this.headersConfig = headersConfig;
    this.url = new URL(url, BACKEND_URL);
    this.sorted = sorted;
    this.isSortLocally = isSortLocally;

    this.render();
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

  get tableBodyTempate() {
    return `<div data-elem="body" class="sortable-table__body"></div>`;
  }

  get tableContainerTemplate() {
    return `
    <div data-elem="productsContainer" class="products-list__container">
      <div class="sortable-table">
      ${this.tableHeaderTempate}
      ${this.tableBodyTempate}
      ${this.loadingTemplate}
      ${this.emptyPlaceholderTemplate}
      </div>
    </div>
    `;
  }

  async render() {
    const {id, order} = this.sorted;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.tableContainerTemplate;
    const element = wrapper.firstElementChild;

    this.element = element;
    this.element
      .querySelectorAll(".sortable-table [data-elem]")
      .forEach(item => this.subElements[item.dataset.elem] = item);

    const sortArrowWrapper = document.createElement('div');
    sortArrowWrapper.innerHTML = this.headerCellSortArrowTemplate;
    this.sortArrowElement = sortArrowWrapper.firstElementChild;

    await this.loadTableRows(id, order);

    this.setHeaderSortArrow(id, order);

    this.initEventListeners();
  }

  async loadData (id, order) {
    return fetchJson(this.url + `?_start=0&_end=${this.pageSize}&_sort=${id}&_order=${order}`);
  }

  async loadTableRows (id, order) {
    this.subElements.body.style.display = "none";
    this.subElements.emptyPlaceholder.style.display = "none";
    this.subElements.loading.style.display = "block";

    try {
      this.data = await this.loadData(id, order);
      this.renderRows(this.data);
    } finally {
      this.subElements.loading.style.display = "none";

      if (this.subElements.body.childElementCount) {
        this.subElements.body.style.display = "block";
      } else {
        this.subElements.emptyPlaceholder.style.display = "block";
      }
    }
  }

  renderRows(data) {
    this.subElements.body.innerHTML = data
      .map(item => this.getTableRecordTempate(item))
      .join("");
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
              result = (value1 || "").localeCompare(value2, 'default', {caseFirst: 'upper'});
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
      .querySelectorAll(".sortable-table__cell")
      .forEach(item => {
        item.removeAttribute("data-order");
      });

    let fieldHeaderElement = this.subElements.header
      .querySelector(".sortable-table__cell[data-name='"+field+"']");
    
    if (fieldHeaderElement) {
      fieldHeaderElement.append(this.sortArrowElement);
      fieldHeaderElement.setAttribute("data-order", order);
    }
  }

  onSortClick = async (event) => {
    let headerCell = event.target.closest(".sortable-table__cell");

    if (headerCell) {
      let { name: field, order } = headerCell.dataset;
      let newOrder = (order === "asc" ? "desc" : "asc");
      let { sortable } = this.headersConfig.find(item => item.id === field);
      
      if (!!sortable) {
        if (this.isSortLocally) {
          this.renderRows(this.data.sort(this.createDataItemsComparator(field, newOrder)));
        } else {
          await this.loadTableRows(field, newOrder);
        }

        this.setHeaderSortArrow(field, newOrder); 
      } 
    }
  }

  initEventListeners () {
    this.subElements.header.addEventListener("click", this.onSortClick);
  }

  removeEventListeners () {
    this.subElements.header.removeEventListener("click", this.onSortClick);
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
