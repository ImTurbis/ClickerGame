export class AntiCrash {
    constructor() {
        this.init();
    }

    init() {
        this.setEvents();
    }

    setEvents() {
        window.addEventListener('error', this.onError.bind(this));
        window.addEventListener('unhandledrejection', this.onUnhandledRejection.bind(this));
    }

    onError(event) {
        console.log('Error: ', event);
    }

    onUnhandledRejection(event) {
        console.log('Unhandled Rejection: ', event);
    }
}