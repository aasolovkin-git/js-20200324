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

  get tableContainerTemplate() {
    return `
    <div data-elem="productsContainer" class="products-list__container">
      <div class="sortable-table">
      </div>
    </div>
    `;
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

  getTableHeaderTempate() {
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

  htmlToElement(html) {
    const element = document.createElement('div');
    element.innerHTML = html;
    return element.firstElementChild;
  }

  render() {
    this.subElements.header = this.htmlToElement(this.getTableHeaderTempate());
    this.subElements.body = this.htmlToElement(this.getTableBodyTempate(this.data));
    this.subElements.loading = this.htmlToElement(this.loadingTemplate);
    this.subElements.emptyPlaceholder = this.htmlToElement(this.emptyPlaceholderTemplate);

    this.element = this.htmlToElement(this.tableContainerTemplate);

    var sortableTableElement = this.element.querySelector(".products-list__container .sortable-table");
    sortableTableElement.append(this.subElements.header);
    sortableTableElement.append(this.subElements.body);
    sortableTableElement.append(this.subElements.loading);
    sortableTableElement.append(this.subElements.emptyPlaceholder);
  }

  createDataItemsComparator(field, order) {
    function comparator(dataItem1, dataItem2) {
      var result = 1;

      var sortable = !!comparator.fieldHeaderInfo && comparator.fieldHeaderInfo.sortable;

      if (sortable) {
        var dataItem1Value = dataItem1 && dataItem1[comparator.field];
        var dataItem2Value = dataItem2 && dataItem2[comparator.field];

        switch (comparator.fieldHeaderInfo.sortType) {
          case 'string':
            result = (dataItem1Value || "").localeCompare((dataItem2Value || ""), 'default', {caseFirst: 'upper'}))
            break;

          case 'number':
            result = (+dataItem1Value || 0) - (+dataItem2Value || 0);
            break;
        }

        if (comparator.order === "desc") result *= -1;
      }
      
      return result;
    }

    comparator.field = field;
    comparator.order = order;
    comparator.fieldHeaderInfo = this.headersConfig.find(item => item.id === field);
    
    return comparator;
  }

  sort (field, order) {
    this.subElements.body.innerHTML = this.data
      .sort(this.createDataItemsComparator(field, order))
      .map(item => this.getTableRecordTempate(item))
      .join("");
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}

