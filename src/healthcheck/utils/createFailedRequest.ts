import { sendMailQueue } from "../../bullConfig";
import Reports from "../../models/report.models";
import NotificationService from "../../utils/Notification/NotificationService";

export class createFailedRequest {
    private interval: number;
    private id: number;
    constructor(interval: number, id: number, thresholdUrl: number, realThreshold: number, notify: any) {
        this.interval = interval;
        this.id = id;
        this.createReport(thresholdUrl, realThreshold, notify)
    }
    private async createReport(thresholdUrl: number, currentThreshold: number, notify: any) {
        if (thresholdUrl == currentThreshold) {
            await sendMailQueue.add(
                new NotificationService(notify).Notify()
            );
        }
        await Reports.create({
            status: "failed",
            downtime: this.interval,
            urlId: this.id
        })
    }
}