"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotificationService {
    constructor(services) {
        this.services = services;
    }
    Notify() {
        this.services.forEach((service) => service.Send());
    }
}
exports.default = NotificationService;
