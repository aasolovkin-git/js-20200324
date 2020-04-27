export default class SortableList {
  element;
  placeholder;
  dragedItem;
  dragedItemShift = {
    x: 0,
    y: 0
  };
  movingPlaceholder = false;
  
  constructor({ items = [] } = {}) {
    this.items = items;

    this.render();
  }

  get listTemplate() {
    return `<ul class="sortable-list"></ul>`;
  }

  get placeholderTemplate() {
    return `<div class="sortable-list__placeholder"></div>`;
  }

  render() {
    let htmlToElement = html => {
      const element = document.createElement('div');
      element.innerHTML = html;
      return element.firstElementChild;
    }

    this.element = htmlToElement(this.listTemplate);
    this.placeholder = htmlToElement(this.placeholderTemplate);

    this.items.forEach(item => {
      item.classList.add("sortable-list__item");
      this.element.append(item);
    });

    this.initEventListeners();  
  }

  onMouseDown = (event) => {
    let grabHandle = event.target.closest("[data-grab-handle]");
    let sortableListItem = event.target.closest(".sortable-list__item");
      
    if (grabHandle && sortableListItem) {
      this.dragedItem = sortableListItem;

      let { left: dragedItemLeft, right: dragedItemRight, top: dragedItemTop, bottom: dragedItemBottom} = this.dragedItem.getBoundingClientRect();

      this.dragedItemShift = {
        x: event.clientX - dragedItemLeft,
        y: event.clientY - dragedItemTop
      };

      this.placeholder.style.width = dragedItemRight - dragedItemLeft + "px";
      this.placeholder.style.height = dragedItemBottom - dragedItemTop + "px";

      this.dragedItem.replaceWith(this.placeholder);

      this.dragedItem.classList.add("sortable-list__item_dragging");
      this.dragedItem.style.width = dragedItemRight - dragedItemLeft + "px";
      this.dragedItem.style.height = dragedItemBottom - dragedItemTop + "px";
      this.dragedItem.style.left = event.clientX - this.dragedItemShift.x + "px";
      this.dragedItem.style.top = event.clientY - this.dragedItemShift.y + "px";

      this.element.append(this.dragedItem);

      document.addEventListener('pointermove', this.onMouseMove);
      document.addEventListener('pointerup', this.onMouseup);
    }
  }

  onMouseup = (event) => {
    if (this.dragedItem) {
      document.removeEventListener('pointermove', this.onMouseMove);
      document.removeEventListener('pointerup', this.OnMouseup);

      this.placeholder.replaceWith(this.dragedItem);

      this.dragedItem.classList.remove("sortable-list__item_dragging");
      this.dragedItem.style.width = "";
      this.dragedItem.style.height = "";
      this.dragedItem.style.left = "";
      this.dragedItem.style.top = "";

      this.placeholder.style.width = "";
      this.placeholder.style.height = "";

      this.dragedItem = null;
    }
  }

  findDroppableItem(x, y) {
    if (this.dragedItem) this.dragedItem.style.display = "none"; 

    var elem = document.elementFromPoint(x, y);

    if (this.dragedItem) this.dragedItem.style.display = ""; 

    return elem
      ? elem.closest(".sortable-list__item")
      : null;
  }

  onMouseMove = (event) => {
    if (this.dragedItem) {
      let newDragedItemPosition = {
        left: event.clientX - this.dragedItemShift.x,
        top: event.clientY - this.dragedItemShift.y
      }
  
      this.dragedItem.style.left = newDragedItemPosition.left + "px";
      this.dragedItem.style.top = newDragedItemPosition.top + "px";

      let droppableItem = this.findDroppableItem(event.clientX, event.clientY);

      if (droppableItem) {
        let { top: droppableItemTop, bottom: droppableItemBottom} = droppableItem.getBoundingClientRect();

        if (event.clientY > (droppableItemBottom + droppableItemTop) / 2) {
          droppableItem.after(this.placeholder);
        } else {
          droppableItem.before(this.placeholder);
        }
      }
    }
  };

  onDragStart = (event) => {
    event.preventDefault();
  }

  initEventListeners () {
    this.element.addEventListener("pointerdown", this.onMouseDown);
    this.element.addEventListener("dragstart", this.onDragStart);
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.element.removeEventListener("pointerdown", this.onMouseDown);
    this.element.removeEventListener("dragstart", this.onDragStart);

    this.items.forEach(item => {
      item.classList.remove("sortable-list__item");
    });

    this.remove();
  }
}
