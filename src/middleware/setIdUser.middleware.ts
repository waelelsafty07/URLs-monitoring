
import { NextFunction, Request, Response } from 'express';

const setIdUserUrlMiddleware = (request: any, response: Response, next: NextFunction) => {
    if (!request.body.userId)
        request.body.userId = request.user.id;
    console.log(request.user.id)
    next();
}

export default setIdUserUrlMiddleware;