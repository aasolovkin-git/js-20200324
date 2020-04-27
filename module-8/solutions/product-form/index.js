import escapeHtml from "../../utils/escape-html.js";

export default class ProductFormComponent {
  element;
  subElements = {};
  defaultFormData = {
    title: '',
    description: '',
    subcategory: '',
    price: '',
    discount: '',
    quantity: '',
    status: '',
    images: [],
    categories: []
  };

  onSubmit = event => {
    event.preventDefault();
    this.dispatchEvent();
  };

  uploadImage = () => {
    const { fileInputList, imageListContainer } = this.subElements;
    const fileInput = this.createUploadImageInput();

    fileInput.addEventListener('change', event => {
      const [file] = event.target.files;
      const reader = new FileReader();

      reader.onload = ({ target }) => {
        imageListContainer.append(this.getImageItem(target.result, file.name));
      };

      reader.readAsDataURL(file);

      fileInputList.append(fileInput);
    });

    fileInput.click();
  };

  createUploadImageInput () {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <input hidden name="images" type="file" accept="image/*">
    `;

    return wrapper.firstElementChild;
  }

  constructor (formData = {}) {
    this.formData = {...this.defaultFormData, ...formData};

    this.render();
    this.createCategoriesSelect();
  }

  get template () {
    return `
      <div class="product-form">

      <form data-element="productForm" class="form-grid">
        <div class="form-group form-group__half_left">
          <fieldset>
            <label class="form-label">Название товара</label>
            <input required
              value="${escapeHtml(this.formData.title)}"
              type="text"
              name="title"
              class="form-control"
              placeholder="Название товара">
          </fieldset>
        </div>

        <div class="form-group form-group__wide">
          <label class="form-label">Описание</label>
          <textarea required
            class="form-control"
            name="description"
            data-element="productDescription"
            placeholder="Описание товара">${escapeHtml(this.formData.description)}</textarea>
        </div>

        <div class="form-group form-group__wide" data-element="sortable-list-container">
          <label class="form-label">Фото</label>

          <ul class="sortable-list" data-element="imageListContainer">
            ${this.createImagesList()}
          </ul>

          <div data-element="fileInputList"></div>

          <button data-element="uploadImage" type="button" class="button-primary-outline">
            <span>Загрузить</span>
          </button>
        </div>

        <div class="form-group form-group__half_left">
          <label class="form-label">Категория</label>
            ${this.createCategoriesSelect()}
        </div>

        <div class="form-group form-group__half_left form-group__two-col">
          <fieldset>
            <label class="form-label">Цена ($)</label>
            <input required
              value="${escapeHtml(this.formData.price)}"
              type="number"
              name="price"
              class="form-control"
              placeholder="100">
          </fieldset>
          <fieldset>
            <label class="form-label">Скидка ($)</label>
            <input required
              value="${escapeHtml(this.formData.discount)}"
              type="number"
              name="discount"
              class="form-control"
              placeholder="0">
          </fieldset>
        </div>

        <div class="form-group form-group__part-half">
          <label class="form-label">Количество</label>
          <input required
            value="${escapeHtml(this.formData.quantity)}"
            type="number"
            class="form-control"
            name="quantity"
            placeholder="1">
        </div>

        <div class="form-group form-group__part-half">
          <label class="form-label">Статус</label>
          <select class="form-control" name="status">
            <option value="1">Активен</option>
            <option value="0">Неактивен</option>
          </select>
        </div>

        <div class="form-buttons">
          <button type="submit" name="save" class="button-primary-outline">
            Сохранить товар
          </button>
        </div>

      </form>
    </div>
    `;
  }

  render () {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(element);
    this.initEventListeners();
  }

  createCategoriesSelect () {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `<select class="form-control" name="subcategory"></select>`;

    const select = wrapper.firstElementChild;

    this.formData.categories.forEach(item => {
      select.append(new Option(item.text, item.value))
    });

    return select.outerHTML;
  }

  getSubElements (element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  dispatchEvent () {
    this.element.dispatchEvent(new CustomEvent('product-saved', {
      bubbles: true,
      detail: this.getFormData()
    }));
  }

  getFormData () {
    const { productForm } = this.subElements;
    const fields = Object.keys(this.defaultFormData);
    const values = fields.reduce((accum, item) => {
      accum[item] = productForm[item] && productForm[item].value;
      return accum;
    }, {});

    values.images = [...document.querySelectorAll('.sortable-table__cell-img')].map(item => {
      return {
        url: item.src,
        source: item.alt
      }
    });

    return values;
  }

  createImagesList () {
    return this.formData.images.map(item => {
      return this.getImageItem(item.url, item.name).outerHTML;
    }).join('');
  }

  getImageItem (url, name) {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <li class="products-edit__imagelist-item sortable-list__item">
        <span>
          <img src="./icon-grab.svg" data-grab-handle alt="grab">
          <img class="sortable-table__cell-img" alt="${escapeHtml(name)}" src="${escapeHtml(url)}">
          <span>${escapeHtml(name)}</span>
        </span>

        <button type="button">
          <img src="./icon-trash.svg" alt="delete" data-delete-handle>
        </button>
      </li>`;

    return wrapper.firstElementChild;
  }

  initEventListeners () {
    const { productForm, uploadImage, imageListContainer } = this.subElements;

    productForm.addEventListener('submit', this.onSubmit);
    uploadImage.addEventListener('click', this.uploadImage);

    imageListContainer.addEventListener('click', event => {
      if ('deleteHandle' in event.target.dataset) {
        event.target.closest('li').remove();
      }
    })
  }

  destroy () {
    this.remove();
    this.element = null;
    this.subElements = null;
  }

  remove () {
    this.element.remove();
  }
}
