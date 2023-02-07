import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import Urls from '../models/urls.models';

const belongToMiddleware = async (request: any, response: Response, next: NextFunction) => {
    const url = await Urls.findByPk(request.params.id);
    if (!url)
        next(
            new HttpException(404,
                "not Founded"
            ));
    if (url?.userId !== request.user.id)
        next(
            new HttpException(401,
                "not allowed"
            ));
    next(); 

}

export default belongToMiddleware;