import { NotificationMessage } from "./index";

describe("NotificationMessage", () => {
  let notificationMessage;

  beforeEach(() => {
    notificationMessage = new NotificationMessage('message', {
      duration: 1000
    });

    document.body.append(notificationMessage.element);
  });

  afterEach(() => {
    notificationMessage.destroy();
    notificationMessage = null;
  });

  it("should be rendered correctly", () => {
    expect(notificationMessage.element).toBeVisible();
    expect(notificationMessage.element).toBeInTheDocument();
  });

  it("should have ability to set duration", () => {
    const duration = 1000;

    notificationMessage = new NotificationMessage('message', {
      duration
    });

    expect(notificationMessage.duration).toBe(duration);
  });

  it("should be removed after time defined in duration property", () => {
    const duration = 1000;

    notificationMessage = new NotificationMessage('message', {
      duration
    });

    const removeMethod = jest.spyOn(notificationMessage, 'remove');

    document.body.append(notificationMessage.element);

    // This mocks out any call to setTimeout, setInterval with dummy functions
    jest.useFakeTimers();

    notificationMessage.show();

    // Move the time ahead with 1 second
    jest.runTimersToTime(duration);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(removeMethod).toBeCalled();
    expect(notificationMessage.element).not.toBeInTheDocument();
  });

  it("should have ability to set message", () => {
    notificationMessage = new NotificationMessage('hi');

    expect(notificationMessage.element).toHaveTextContent('hi');
  });

  it("should have ability to define target element for rendering ", () => {
    notificationMessage = new NotificationMessage('hi');

    const div = document.createElement('div');

    notificationMessage.show(div);

    expect(div).toContainHTML(notificationMessage.element.outerHTML);
  });

  it('should have ability to be destroyed', () => {
    notificationMessage.destroy();

    expect(notificationMessage.element).not.toBeInTheDocument();
  });
});
