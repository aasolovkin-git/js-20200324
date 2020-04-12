import tooltip from "./index";

describe("tooltip", () => {
  beforeEach(() => {
    tooltip.initialize();
  });

  afterEach(() => {
    tooltip.destroy();
  });

  it("should be rendered correctly", () => {
    tooltip.render('');
    expect(tooltip.element).toBeVisible();
    expect(tooltip.element).toBeInTheDocument();
  });
});
