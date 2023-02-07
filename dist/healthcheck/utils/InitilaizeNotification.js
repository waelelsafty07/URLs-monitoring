"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitilaizeNotification = void 0;
const EmailService_1 = __importDefault(require("../../utils/Notification/EmailService"));
class InitilaizeNotification {
    constructor(webhook, alertMailvlue) {
        this.webhook = webhook;
        this.alertMailvlue = alertMailvlue;
    }
    notification() {
        let NotificationService = [];
        if (this.webhook == "email")
            NotificationService.push(new EmailService_1.default(this.alertMailvlue));
        return NotificationService;
    }
}
exports.InitilaizeNotification = InitilaizeNotification;
