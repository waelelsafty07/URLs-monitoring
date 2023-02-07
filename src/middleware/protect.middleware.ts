
import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken"
import HttpException from '../exceptions/HttpException';
import User from '../models/users.models';

const protectMiddleware = async (request: any, response: Response, next: NextFunction) => {
    let token;
    if (
        request.headers.authorization &&
        request.headers.authorization.startsWith("Bearer")
    ) {
        token = request.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(
            new HttpException(401, "You are not authenticated, Please login again")
        );
    }
    // 2) verify token (no change ,expired token)
    const decoded: any = jwt.verify(token, String(process.env.JWT_SECRET_KEY));
    // 3) check if user exist
    const currentUser = await User.findByPk(decoded.usrID);
    if (!currentUser) {
        return next(
            new HttpException(401,
                "The user that belong to this token does no longer exist"

            )
        );
    }
    request.user = currentUser;
    next();
}

export default protectMiddleware;