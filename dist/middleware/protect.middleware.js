"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const users_models_1 = __importDefault(require("../models/users.models"));
const protectMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (request.headers.authorization &&
        request.headers.authorization.startsWith("Bearer")) {
        token = request.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new HttpException_1.default(401, "You are not authenticated, Please login again"));
    }
    // 2) verify token (no change ,expired token)
    const decoded = jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET_KEY));
    // 3) check if user exist
    const currentUser = yield users_models_1.default.findByPk(decoded.usrID);
    if (!currentUser) {
        return next(new HttpException_1.default(401, "The user that belong to this token does no longer exist"));
    }
    request.user = currentUser;
    next();
});
exports.default = protectMiddleware;
