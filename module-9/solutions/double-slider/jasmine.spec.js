import DoubleSlider from './index.js';

describe("DoubleSlider", () => {
  const holderWidth = '1000px';
  const sliderStep = 9; // This value was found experimental towards "holderWidth" value

  let doubleSlider;

  beforeEach(() => {
    const holder = document.createElement('div');

    doubleSlider = new DoubleSlider({
      min: 100,
      max: 200,
      formatValue: value => '$' + value,
      selected: {
        from: 120,
        to: 150
      }
    });

    holder.style.width = holderWidth;

    holder.append(doubleSlider.element);

    document.body.append(holder);
  });

  afterEach(() => {
    doubleSlider.destroy();
    doubleSlider = null;
  });

  it("should be rendered correctly", () => {
    const doubleSliderElem = document.querySelector('.range-slider');

    expect(doubleSliderElem).toBeInstanceOf(HTMLElement);
    expect(doubleSliderElem.classList.contains('range-slider')).toBeTrue();
  });

  it('should have ability to be destroyed', () => {
    doubleSlider.destroy();
    const doubleSliderElem = document.querySelector('.range-slider');

    expect(doubleSliderElem).toBeNull();
  });

  it('should have ability to change selected range by moving left slider', () => {
    const leftSlider = doubleSlider.element.querySelector('.range-slider__thumb-left');
    const leftBoundary = doubleSlider.element.querySelector('span[data-element="from"]');
    const stepsCounter = 1;
    const expectedValue = `$${doubleSlider.selected.from - stepsCounter}`;

    const down = new MouseEvent('pointerdown', {
      bubbles: true
    });

    const move = new MouseEvent('pointermove', {
      clientX: -sliderStep * stepsCounter,
      bubbles: true
    });

    leftSlider.dispatchEvent(down);
    leftSlider.dispatchEvent(move);

    expect(leftBoundary.textContent).toContain(expectedValue);
  });

  it('should have ability to change selected range by moving right slider', () => {
    const rightSlider = doubleSlider.element.querySelector('.range-slider__thumb-right');
    const rightBoundary = doubleSlider.element.querySelector('span[data-element="to"]');
    const stepsCounter = 5;
    const expectedValue = `$${doubleSlider.selected.to + stepsCounter}`;

    const down = new MouseEvent('pointerdown', {
      bubbles: true
    });

    const move = new MouseEvent('pointermove', {
      clientX: sliderStep * stepsCounter,
      bubbles: true
    });

    rightSlider.dispatchEvent(down);
    rightSlider.dispatchEvent(move);

    expect(rightBoundary.textContent).toContain(expectedValue);
  });
});
