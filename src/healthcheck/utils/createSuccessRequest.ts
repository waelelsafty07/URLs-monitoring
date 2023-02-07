import Reports from "../../models/report.models";

export class createSuccessRequest {
    private interval: number;
    private responseTime: number;
    private id: number;
    constructor(interval: number, resTime: number, id: number) {
        this.interval = interval;
        this.responseTime = resTime;
        this.id = id;
        this.createReport()
    }
    private async createReport() {
        await Reports.create({
            status: "success",
            uptime: this.interval,
            responseTime: this.responseTime,
            urlId: this.id
        })
    }
}