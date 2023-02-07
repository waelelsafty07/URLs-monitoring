import * as bcrypt from 'bcrypt';
import * as express from 'express';
import validationMiddleware from '../middleware/validation.middleware';
import User from '../models/users.models'
import EmailService from '../utils/Notification/EmailService';
import NotificationService from '../utils/Notification/NotificationService';
import { sendMailQueue } from "../bullConfig"
import HttpException from '../exceptions/HttpException';
import GenerationToken from '../utils/generationToken';
import protectMiddleware from '../middleware/protect.middleware';


class AuthenticationController {
    public path = '/auth';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, this.registration);
        this.router.post(`${this.path}/login`, this.loggingIn);
    }

    private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            const user = await User.create({ ...request.body })

            const optMailvlue = {
                from: "waelismael07@gmail.com",
                to: "waelelsafty07@gmail.com",
                subject: "Activate Account",
                html: "hello",
            }


            try {
                await sendMailQueue.add(
                    new NotificationService([new EmailService(optMailvlue)]).Notify()
                );

            } catch (error) {
                console.log(error)
            }

            response.json({ msg: "added", user });
        } catch (err) {

            response.json({ msg: "added", err });
        }
    }

    private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const user = await User.findOne({
            where: { email: request.body.email }
        })
        if (!user || !(await bcrypt.compare(request.body.password, user.password))) {
            return next(new HttpException(404, "Incorrect email or password"));
        }

        const payload = {
            usrID: user.id,
            email: user.email,
        }
        const token = new GenerationToken(payload).genrate("2d")
        response.json({ msg: "added", user, token })
    }

}

export default AuthenticationController;