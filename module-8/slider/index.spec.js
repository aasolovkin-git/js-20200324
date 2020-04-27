import Slider from "./index";

describe("Slider", () => {
  let slider;

  beforeEach(() => {
    slider = new Slider();

    document.body.append(slider.element);
  });

  afterEach(() => {
    slider.destroy();
  });


  it("should be rendered correctly", async () => {
    expect(slider.element).toBeVisible();
    expect(slider.element).toBeInTheDocument();
  });

  it('should have ability to be destroyed', () => {
    slider.destroy();

    expect(slider.element).not.toBeInTheDocument();
  });
});
