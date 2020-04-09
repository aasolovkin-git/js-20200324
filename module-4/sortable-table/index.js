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

  render() {
    this.element = htmlToElement(this.tableContainerTemplate);

    let sortableTableElement = this.element.querySelector(".products-list__container .sortable-table");
    
    sortableTableElement.append(this.subElements.header = htmlToElement(this.tableHeaderTempate));
    sortableTableElement.append(this.subElements.body = htmlToElement(this.getTableBodyTempate(this.data)));
    sortableTableElement.append(this.subElements.loading = htmlToElement(this.loadingTemplate));
    sortableTableElement.append(this.subElements.emptyPlaceholder = htmlToElement(this.emptyPlaceholderTemplate));

    function htmlToElement(html) {
      const element = document.createElement('div');
      element.innerHTML = html;
      return element.firstElementChild;
    }
  }

  createDataItemsComparator(field, order) {
    function comparator(dataItem1, dataItem2) {
      let result = 0;

      let fieldHeaderInfo = comparator.fieldHeaderInfo;
      
      let sortable = !!fieldHeaderInfo && fieldHeaderInfo.sortable;
      
      if (sortable) {
        let dataItem1Value = dataItem1 && dataItem1[comparator.field];
        let dataItem2Value = dataItem2 && dataItem2[comparator.field];

        let sortType = fieldHeaderInfo && fieldHeaderInfo.sortType;

        switch (sortType) {
          case 'string':
            result = (dataItem1Value || "").localeCompare((dataItem2Value || ""), 'default', {caseFirst: 'upper'});
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

  setHeaderSortArrow(field, order) {
    this.subElements.header
      .querySelectorAll(".sortable-table__cell")
      .forEach(item => {
        let cellId = item.dataset.name;
        let cellHeaderConfig = this.headersConfig.find(item => item.id === cellId);
        let cellSortable = !!cellHeaderConfig && cellHeaderConfig.sortable;
        
        if (cellSortable) {
          let sortArrowElement = item.querySelector("span.sortable-table__sort-arrow");

          item.setAttribute("data-sortable", (cellId === field) || "");

          if (cellId === field) {
            item.setAttribute("data-order", order);
            if (!sortArrowElement) item.insertAdjacentHTML("beforeEnd", this.headerCellSortArrowTemplate);
          } else {
            item.removeAttribute("data-order");
            if (sortArrowElement) sortArrowElement.remove();
          }
        }
      });
  }

  sort (field, order) {
    this.subElements.body.innerHTML = this.data
      .sort(this.createDataItemsComparator(field, order))
      .map(item => this.getTableRecordTempate(item))
      .join("");

    this.setHeaderSortArrow(field, order);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}

