import EmailService from "../../utils/Notification/EmailService"

export class InitilaizeNotification {
    private webhook: string
    private alertMailvlue: any
    constructor(webhook: string, alertMailvlue: any) {
        this.webhook = webhook
        this.alertMailvlue = alertMailvlue
    }

    public notification() {
        let NotificationService: any = []
        if (this.webhook == "email")
            NotificationService.push(new EmailService(this.alertMailvlue))

        return NotificationService
    }

}