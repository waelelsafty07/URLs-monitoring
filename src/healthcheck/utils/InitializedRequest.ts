import axios from "axios";

export class InitializedRequest {
    private instance = axios.create()
    private threshold = 0;

    constructor() {
        this.CalculateTimeRrquest()
    }
    private CalculateTimeRrquest = () => {
        this.instance.interceptors.request.use((config: any) => {
            config.headers['request-startTime'] = process.hrtime()
            return config
        })
        this.instance.interceptors.response.use((response: any) => {
            const start = response.config.headers['request-startTime']
            const end = process.hrtime(start)
            const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000))
            response.headers['request-duration'] = milliseconds
            return response
        })
    }
    public instanceRequest() {
        return this.instance
    }
    public thresholdIncrease() {
        return this.threshold += 1
    }
}