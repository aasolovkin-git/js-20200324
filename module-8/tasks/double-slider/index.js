export default class DoubleSlider {
  element;
  subElements = {};

  constructor ({
     min = 100,
     max = 200,
     formatValue = value => '$' + value,
     selected = {
       from: min,
       to: max
     }
   } = {}) {
    this.min = min;
    this.max = max;
    this.formatValue = formatValue;
    this.selected = selected;

    this.render();
  }

  get template () {
    let calcSliderPosition = value => {
      return (value - this.min)/(this.max - this.min)*100;
    }

    return `
    <div class="range-slider">
      <span data-element="from">${this.formatValue(this.selected.from)}</span>
      <div data-element="inner" class="range-slider__inner">
        <span data-element="progress" class="range-slider__progress" style="left: ${ calcSliderPosition(this.selected.from) + "%" }; right: ${ 100 - calcSliderPosition(this.selected.to) + "%" };"></span>
        <span data-element="thumbLeft" class="range-slider__thumb-left" style="${ calcSliderPosition(this.selected.from) + "%" };"></span>
        <span data-element="thumbRight" class="range-slider__thumb-right" style="right: ${ 100 - calcSliderPosition(this.selected.to) + "%" };"></span>
      </div>
      <span data-element="to">${this.formatValue(this.selected.to)}</span>
    </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    this.initEventListeners();
  }

  getSubElements (element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  OnMouseDown = (event) => {
    if (event.target.classList.contains("range-slider__thumb-left") ||
        event.target.classList.contains("range-slider__thumb-right")) {
      let dragedSlider = event.target;
      let isLeftSliderDraged = dragedSlider.classList.contains("range-slider__thumb-left");

      let shiftX = event.clientX - dragedSlider.getBoundingClientRect().left;

      let { left: sliderBarLeft , right: sliderBarRight } = this.subElements.inner.getBoundingClientRect();
      let sliderBarWidth = sliderBarRight - sliderBarLeft;

      let availableDragedSliderRange = isLeftSliderDraged
        ? {
            min: 0,
            max: this.subElements.thumbRight.getBoundingClientRect().left - sliderBarLeft
          }
        : {
            min: this.subElements.thumbLeft.getBoundingClientRect().right - sliderBarLeft,
            max: sliderBarWidth
          }

      let onMouseMove = (event) => {
        const { clientX } = event;

        let newLeft = clientX - shiftX - sliderBarLeft;
    
        if (newLeft < availableDragedSliderRange.min) {
          newLeft = availableDragedSliderRange.min;
        }
    
        if (newLeft > availableDragedSliderRange.max) {
          newLeft = availableDragedSliderRange.max;
        }
    
        let newDragedSliderPosition = sliderBarWidth 
          ? newLeft/sliderBarWidth*100 
          : isLeftSliderDraged
            ? 0
            : 100;

        let newDragedSliderValue = sliderBarWidth
          ? Math.round(newLeft / sliderBarWidth * (this.max - this.min)) + this.min
          : isLeftSliderDraged
            ? this.min
            : this.max;

        dragedSlider.style.left = newDragedSliderPosition + '%';         

        let progressElement = this.subElements.progress;

        if (isLeftSliderDraged) {
          progressElement.style.left = newDragedSliderPosition + '%';
          this.selected.from = newDragedSliderValue;
        } else {
          progressElement.style.right = 100 - newDragedSliderPosition + '%';
          this.selected.to = newDragedSliderValue;
        }

        this.setLabelValues(this.selected);

        this.dispatchRangeMoveEvent();
      };
      
      let OnMouseup = (event) => {
        document.removeEventListener('pointermove', onMouseMove);
        document.removeEventListener('pointerup', OnMouseup);

        this.dispatchRangeSelectEvent();
      }

      document.addEventListener('pointermove', onMouseMove);
      document.addEventListener('pointerup', OnMouseup);
    }
  }

  dispatchRangeMoveEvent () {
    this.element.dispatchEvent(new CustomEvent("range-move", {
      detail: this.selected
    }));
  }  

  dispatchRangeSelectEvent () {
    this.element.dispatchEvent(new CustomEvent("range-select", {
      detail: this.selected
    }));
  }  

  setLabelValues( { from, to } = this.selected ) {
    this.subElements.from.textContent = this.formatValue(from);
    this.subElements.to.textContent = this.formatValue(to);
  }

  initEventListeners () {
    this.element.addEventListener("pointerdown", this.OnMouseDown);
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.element.removeEventListener("pointerdown", this.OnMouseDown);
    this.remove();
  }
}
