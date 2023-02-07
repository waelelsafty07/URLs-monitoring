import * as express from 'express';
import { SchduleQueue } from '../bullConfig';
import protectMiddleware from '../middleware/protect.middleware';
import setIdUserUrlMiddleware from '../middleware/setIdUser.middleware';
import Urls from '../models/urls.models';
import healthcheckRequest from './healthcheckRequest';
import { InitilaizeNotification } from './utils/InitilaizeNotification';


class HealthcheckController {
    public path = '/healthcheck';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/`, protectMiddleware, setIdUserUrlMiddleware, this.postUrl);
    }

    private postUrl = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            const Url = await Urls.create({ ...request.body })

            response.json({ msg: "added", Url });
        } catch (err) {

            response.json({ msg: "added", err });
        }
    }

}

const alertMailvlue = {
    from: "waelismael07@gmail.com",
    to: "waelelsafty07@gmail.com",
    subject: "Notify Url",
    html: "Failed",
}
export default HealthcheckController;