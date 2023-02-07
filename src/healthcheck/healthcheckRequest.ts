import { createFailedRequest } from './utils/createFailedRequest';
import { createSuccessRequest } from './utils/createSuccessRequest';
import { InitializedRequest } from './utils/InitializedRequest';









class healthcheckRequest extends InitializedRequest {
    private urlId: number;
    private notify: any;
    constructor(url: any, urlId: number, notify: any) {
        super();
        this.urlId = urlId
        this.notify = notify
        this.requestUrl(url)
    }

    private async requestUrl(url: any) {
        try {
            const res = await this.instanceRequest().get(url.url, {
                timeout: url.timeout * 1000
            })
            if (!res)
                new createFailedRequest(url.interval, this.urlId, url.threshold, this.thresholdIncrease(), this.notify)
            new createSuccessRequest(url.interval, res.headers['request-duration'], this.urlId)

        } catch (err: any) {

            new createFailedRequest(url.interval, this.urlId, url.threshold, this.thresholdIncrease(), this.notify)
        }
    }

}
export default healthcheckRequest


