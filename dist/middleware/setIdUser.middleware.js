"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setIdUserUrlMiddleware = (request, response, next) => {
    if (!request.body.userId)
        request.body.userId = request.user.id;
    console.log(request.user.id);
    next();
};
exports.default = setIdUserUrlMiddleware;
