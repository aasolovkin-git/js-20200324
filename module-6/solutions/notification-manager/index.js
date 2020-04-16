import {
  SuccessNotificationMessage,
  ErrorNotificationMessage,
  WarningNotificationMessage,
  NotificationMessage
} from '../notification';

export default class NotificationManager {
  static instance;

  notificationsList = [];

  constructor ({ stackLimit = 3} = {}) {
    // Note: This is Singleton
    if (NotificationManager.instance) {
      return NotificationManager.instance
    }

    this.stackLimit = stackLimit;

    this.createContainer();

    NotificationManager.instance = this;
  }

  getNotificationMessageClass (type) {
    switch (type) {
      case 'success':
        return SuccessNotificationMessage;
      case 'error':
        return ErrorNotificationMessage;
      case 'warning':
        return WarningNotificationMessage;
      default:
        return NotificationMessage;
    }
  }

  showMessage (message, options = {}) {
    const { type = 'success'} = options;
    const NotificationClass = this.getNotificationMessageClass(type);
    const notification = new NotificationClass(message, options);

    notification.show(this.element);

    if (this.notificationsList.length >= this.stackLimit) {
      this.removeOldMessage();
    }

    if (!(notification instanceof ErrorNotificationMessage)) {
      this.notificationsList.push(notification);
    }
  }

  removeOldMessage () {
    const notification = this.notificationsList.shift();

    notification.remove();
  }

  createContainer () {
    this.element = document.createElement('div');
    this.element.className = 'notifications-container';

    document.body.append(this.element);
  }

  remove () {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy () {
    this.remove();
    this.notificationsList = [];
    NotificationManager.instance = null;
  }
}
