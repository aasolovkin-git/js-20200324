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

    this.sortArrowElement = htmlToElement(this.headerCellSortArrowTemplate);
    this.element = htmlToElement(this.tableContainerTemplate);

    this.element
      .querySelectorAll(".sortable-table [data-elem]")
      .forEach(item => this.subElements[item.dataset.elem] = item);

    await this.loadTableRows(id, order);

    this.setHeaderSortArrow(id, order);

    this.initEventListeners();

    function htmlToElement(html) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      return wrapper.firstElementChild;
    }
  }

  async loadData (id, order) {
    this.url.searchParams.set('_start', 0);
    this.url.searchParams.set('_end', this.pageSize);
    this.url.searchParams.set('_sort', id);
    this.url.searchParams.set('_order', order);
    
    return fetchJson(this.url);
  }

  async loadTableRows (id, order) {
    let { body, emptyPlaceholder, loading } = this.subElements
    
    body.style.display = "none";
    emptyPlaceholder.style.display = "none";
    loading.style.display = "block";

    try {
      this.data = await this.loadData(id, order);
      this.renderRows(this.data);
    } finally {
      loading.style.display = "none";

      if (this.data.length) {
        body.style.display = "block";
      } else {
        emptyPlaceholder.style.display = "block";
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
      
      if (Boolean(sortable)) {
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
      
      if (Boolean(sortable)) {
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
