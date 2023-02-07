import * as express from 'express';
import { QueryTypes } from 'sequelize';
import db from '../config';
import belongToMiddleware from '../middleware/belongTo.middleware';
import protectMiddleware from '../middleware/protect.middleware';


class ReportsController {

    public path = '/generateReport';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, protectMiddleware, belongToMiddleware, this.gerationById);
    }

    private anaylisQuery(id: number) {
        const anaylis = db.query(`
            SELECT 
                status as currentStatus ,
                SUM(uptime) as uptimeTotal,
                SUM(downtime)as downtimeTotal,
                (SUM(uptime) / (SUM(uptime) + SUM(downtime)))*100 as availability,
                AVG(responseTime) as responseTimeAVG
            FROM reports WHERE urlId = ${id} ORDER BY createdAT DESC
            `, { type: QueryTypes.SELECT });
        return anaylis
    }
    private historyQuery(id: number) {
        const history = db.query(`
            SELECT * FROM reports WHERE urlId = ${id} ORDER BY id LIMIT 50
            `, { type: QueryTypes.SELECT })
        return history;
    }
    private gerationById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {

            const anaylis = this.anaylisQuery(Number(request.params.id))
            const history = this.historyQuery(Number(request.params.id))
            const data = await Promise.all([anaylis, history])

            response.json({ msg: "added", data });
        } catch (err) {

            response.json({ msg: "added", err });
        }
    }

}

export default ReportsController;