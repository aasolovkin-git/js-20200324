export class NotificationMessage {
  constructor (message, {
    duration = 2000
  } = {}) {

    this.message = message;
    this.durationInSeconds = (duration / 1000) + 's';
    this.duration = duration;

    this.render();
  }

  get template () {
    return `<div class="notification" style="--value:${this.durationInSeconds}">
      <div class="inner-wrapper">
        <div class="notification-header">Notification</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>`;
  }

  render () {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
  }

  show (parent) {
    const root = parent || document.body;

    root.append(this.element);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove () {
    this.element.remove();
  }

  destroy () {
    this.remove();
  }
}

export class SuccessNotificationMessage extends NotificationMessage {
  get template () {
    return `<div class="notification success" style="--value:${this.durationInSeconds}">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">Success:</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>`;
  }
}

export class ErrorNotificationMessage extends NotificationMessage {
  get template () {
    return `<div class="notification error">
      <div class="inner-wrapper">
        <div class="notification-header">Error: <span class="close">&times;</span></div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>`;
  }

  constructor(message, options) {
    super(message, options);

    this.addEventListeners();
  }

  addEventListeners () {
    const closeBtn = this.element.querySelector('.close');

    closeBtn.addEventListener('click', () => {
      this.remove();
    });
  }

  show (parent) {
    const root = parent || document.body;

    root.append(this.element);
  }
}

export class WarningNotificationMessage extends NotificationMessage {
  get template () {
    return `<div class="notification warning" style="--value:${this.durationInSeconds}">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">Warning:</div>
        <div class="notification-body">
          ${this.message}
        </div>
      </div>
    </div>`;
  }
}
