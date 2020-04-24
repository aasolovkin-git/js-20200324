import fetchJson from "./../../../utils/fetch-json.js";
import escapeHtml from "./../../../utils/escape-html.js";
import ImageUploader from './../../../utils/image-uploader.js';

const BACKEND_URL = 'https://course-js.javascript.ru';


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
    images: []
  };

  constructor (formData = {}) {
    this.editMode = Boolean(formData);

    this.formData = {...this.defaultFormData, ...formData};
    this.render();
  }

  getImageItemTemplate(imageDataItem) {
    return `
    <li class="products-edit__imagelist-item sortable-list__item" style="">
      <input type="hidden" name="url" value="${imageDataItem.url}">
      <input type="hidden" name="source" value="${imageDataItem.name}">
      <span>
        <img src="./icon-grab.svg" data-grab-handle="" alt="grab">
        <img class="sortable-table__cell-img" alt="Image" src="${imageDataItem.url}">
        <span>${imageDataItem.name}</span>
      </span>
      <button type="button">
        <img src="./icon-trash.svg" data-delete-handle="" alt="delete">
      </button>
    </li>
    `;
  }

  get template () {
    return `
    <div class="product-form">
      <form data-elem="productForm" class="form-grid">
        <div class="form-group form-group__half_left">
          <fieldset>
            <label class="form-label">Название товара</label>
            <input required="" type="text" name="title" class="form-control" placeholder="Название товара">
          </fieldset>
        </div>
        <div class="form-group form-group__wide">
          <label class="form-label">Описание</label>
          <textarea required="" class="form-control" name="description" data-elem="productDescription" placeholder="Описание товара"></textarea>
        </div>
        <div class="form-group form-group__wide" data-elem="sortable-list-container">
          <label class="form-label">Фото</label>
          <ul class="sortable-list" data-elem="imageListContainer">
          </ul>
          <button type="button" name="uploadImage" class="button-primary-outline"><span>Загрузить</span></button>
        </div>
        <div class="form-group form-group__half_left">
          <label class="form-label">Категория</label>
          <select class="form-control" name="category">
          </select>
        </div>
        <div class="form-group form-group__half_left form-group__two-col">
          <fieldset>
            <label class="form-label">Цена ($)</label>
            <input required="" type="number" name="price" class="form-control" placeholder="100">
          </fieldset>
          <fieldset>
            <label class="form-label">Скидка ($)</label>
            <input required="" type="number" name="discount" class="form-control" placeholder="0">
          </fieldset>
        </div>
        <div class="form-group form-group__part-half">
          <label class="form-label">Количество</label>
          <input required="" type="number" class="form-control" name="quantity" placeholder="1">
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
            ${ this.editMode ? "Сохранить" : "Добавить"} товар
          </button>
        </div>
      </form>
    </div>    
    `;
  }

  async loadCategories() {
    let result = [];

    let url = new URL('api/rest/categories', BACKEND_URL);
    url.searchParams.set('_sort', "weight");
    url.searchParams.set('_refs', "subcategory");
    
    return await fetchJson(url);
  }

  initFormData(formData = {}) {
    let formElement = this.subElements.productForm;
    formElement.title.value = formData.title;
    formElement.description.value = formData.description;
    formElement.price.value = formData.price;
    formElement.discount.value = formData.discount;
    formElement.quantity.value = formData.quantity;

    formElement.status.value = formData.status;
    if (!formElement.status.value) formElement.status.selectedIndex = 0;

    if (formData.images) {
      this.subElements.imageListContainer.innerHTML = formData.images
        .map(imageDataItem => this.getImageItemTemplate(imageDataItem))
        .join("");
    }

    this.loadCategories()
    .then(categories => {
      formElement.category.innerHTML = [].concat( ...categories
        .map(category => category.subcategories.map(subcategory => `<option value="${category.id}">${ category.title + " > " + subcategory.title}</option>`))).join("");

      formElement.category.value = formData.subcategory;
      if (!formElement.category.value) formElement.category.selectedIndex = 0;
    })
    .catch(() => {
      formElement.category.innerHTML = "";
      formElement.category.value = null;
    });
  }

  render () {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(element);

    this.initFormData(this.formData);

    this.initEventListeners();
  }

  getSubElements (element) {
    const elements = element.querySelectorAll('[data-elem]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.elem] = subElement;

      return accum;
    }, {});
  }

  getFormData() {
    let formElement = this.subElements.productForm;
    let imagesItemsElements = this.subElements.imageListContainer.querySelectorAll("li");
    
    let result = {
      title: formElement.title.value,
      description: formElement.description.value,
      subcategory: formElement.category.value,
      price: +formElement.price.value || 0,
      discount: +formElement.discount.value || 0,
      quantity: +formElement.quantity.value || 0,
      status: +formElement.status.value || 0,
      images: [...imagesItemsElements].map(item => {
        return {
          url: item.querySelector("input[name='url']").value,
          source: item.querySelector("input[name='source']").value
        }
      })
    };

    if (this.editMode) {
      result.id = this.formData.id;
    }

    return result;
  }

  uploadImage = async () => {
    let inputFile = document.createElement("input");
    inputFile.setAttribute("type", "file");
    
    inputFile.onchange = async (event) => {
      let choosedFile = event.currentTarget.files[0];

      let uploader = new ImageUploader();
  
      try {
        let result = await uploader.upload(choosedFile);

        this.subElements.imageListContainer.insertAdjacentHTML("beforeEnd", 
        this.getImageItemTemplate({
          url: result.data.link,
          name: choosedFile.name
        }));
      } catch(err) {
        this.dispatchImageUploadingErrorEvent(err);
      }
    };

    inputFile.click();
  };

  async postData() {
    try {
      let url = new URL('api/rest/products', BACKEND_URL);
      
      await fetchJson(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(this.getFormData())
      });

      this.dispatchProductSavedEvent(); 
    } catch(err) {
      this.dispatchProductSavingErrorEvent(err);
    }
  }
  
  onSubmit = async event => {
    event.preventDefault();
    this.postData();
  };

  onImageListContainerClick = (event) => {
    let deleteButton = event.target.closest("button");
    let imageListItem = event.target.closest(".products-edit__imagelist-item");

    if (deleteButton && imageListItem) {
      imageListItem.remove();
    }
  }

  dispatchProductSavedEvent () {
    this.element.dispatchEvent(new CustomEvent("product-saved", {
      detail: this.getFormData()
    }));
  }

  dispatchProductSavingErrorEvent (error) {
    this.element.dispatchEvent(new CustomEvent("product-saving-error", {
      detail: {
        error: error,
        product: this.getFormData()
      }
    }));
  }

  dispatchImageUploadingErrorEvent (error) {
    this.element.dispatchEvent(new CustomEvent("product-image-uploading-error", {
      detail: {
        error: error
      }
    }));
  }

  initEventListeners () {
    this.subElements.productForm.addEventListener("submit", this.onSubmit);
    this.subElements.productForm.uploadImage.addEventListener("click", this.uploadImage);
    this.subElements.imageListContainer.addEventListener("click", this.onImageListContainerClick);
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
