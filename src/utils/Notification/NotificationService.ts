import NotifyService from "./NotifyService";

class NotificationService {
    private readonly services: [NotifyService];
    constructor(services: [NotifyService]) {
        this.services = services;
    }

    public Notify() {

        this.services.forEach((service) => service.Send())

    }
}

export default NotificationService