export default class NotificationMessage {
    constructor(mesageText, { duration, type } = {}) {
        this.mesageText = mesageText;
        this.duration = duration;
        this.type = type;

        this.render();
    }

    destroy() {
        this.remove();
    }

    remove() {
        clearTimeout(this.destroyTimer);
        this.element.remove();
    }

    get htmlTemplate() {  
        return `
            <div class="notification ${this.type}" style="--value:${this.duration}ms">
                <div class="timer"></div>
                <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">
                    ${this.mesageText}
                </div>
                </div>
            </div>`;
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = this.htmlTemplate;

        this.element = element.firstElementChild;
    }

    show(destinationElement) {
        if (window.notification) {
            window.notification.destroy();
        }
        
        window.notification = this;

        let elementOwner = destinationElement || document.body;
        elementOwner.append(this.element);

        this.destroyTimer = setTimeout(() => { this.remove(); }, this.duration);
    }
}