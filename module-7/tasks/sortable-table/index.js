import fetchJson from "./../../../utils/fetch-json.js";

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class SortableTable {
  element;
  sortArrowElement;
  subElements = {};
  headersConfig = [];
  data = [];
  dataCanBeLoad = true;
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
    let htmlToElement = (html) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      return wrapper.firstElementChild;
    }

    this.sortArrowElement = htmlToElement(this.headerCellSortArrowTemplate);
    this.element = htmlToElement(this.tableContainerTemplate);

    this.element
      .querySelectorAll(".sortable-table [data-elem]")
      .forEach(item => this.subElements[item.dataset.elem] = item);

    await this.loadTableRows(this.sorted);

    this.setHeaderSortArrow(this.sorted);

    this.initEventListeners();
  }

  async loadData (id, order, start, end) {
    let result = [];

    let { loading } = this.subElements;

    loading.style.display = "block";
    try {
      this.url.searchParams.set('_start', start);
      this.url.searchParams.set('_end', end);
      this.url.searchParams.set('_sort', id);
      this.url.searchParams.set('_order', order);
      
      result = await fetchJson(this.url);
    } finally {
      loading.style.display = "none";
    }

    return result;
  }

  async loadNextRowsPartToTable({ id, order } = {}) {
    if (this.dataCanBeLoad) {
      this.dataCanBeLoad = false;

      let data = await this.loadData(id, order, this.data.length, this.data.length + this.pageSize);
      this.data.splice(this.data.length, 0, ...data);

      this.appendTableRows(data);

      this.dataCanBeLoad = this.pageSize === data.length;
    }
  }

  async loadTableRows ( { id, order } = {}) {
    let { body, emptyPlaceholder } = this.subElements
    
    body.style.display = "none";
    emptyPlaceholder.style.display = "none";

    try {
      this.data = [];
      this.dataCanBeLoad = true;

      this.clearTableRows();
      await this.loadNextRowsPartToTable({ id, order });
    } finally {
      if (body.childElementCount) {
        body.style.display = "block";
      } else {
        emptyPlaceholder.style.display = "block";
      }
    }
  }

  clearTableRows() {
    this.subElements.body.innerHTML = "";
  }

  appendTableRows(data) {
    this.subElements.body.insertAdjacentHTML("beforeEnd", data
      .map(item => this.getTableRecordTempate(item))
      .join(""));
  }

  createDataItemsComparator({ id: field, order } = {}) {
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

  setHeaderSortArrow({ id: field, order} = {}) {
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
        this.sorted.id = field;
        this.sorted.order = newOrder;

        if (this.isSortLocally) {
          this.clearTableRows();
          this.appendTableRows(this.data.sort(this.createDataItemsComparator(this.sorted)));
        } else {
          await this.loadTableRows(this.sorted);
        }

        this.setHeaderSortArrow(this.sorted); 
      } 
    }
  }

  OnWindowScroll = async (event) => {
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let distanceToBottom = scrollHeight - window.innerHeight - scrollTop;

    if (distanceToBottom < 100) {
      await this.loadNextRowsPartToTable(this.sorted);
    }
  }

  initEventListeners () {
    this.subElements.header.addEventListener("click", this.onSortClick);

    if (!this.isSortLocally) {
      window.addEventListener("scroll", this.OnWindowScroll);
    }
  }

  removeEventListeners () {
    this.subElements.header.removeEventListener("click", this.onSortClick);
    
    if (!this.isSortLocally) {
      window.removeEventListener("scroll", this.OnWindowScroll);
    }
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
