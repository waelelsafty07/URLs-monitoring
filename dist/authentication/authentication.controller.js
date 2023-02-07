"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const express = __importStar(require("express"));
const users_models_1 = __importDefault(require("../models/users.models"));
const EmailService_1 = __importDefault(require("../utils/Notification/EmailService"));
const NotificationService_1 = __importDefault(require("../utils/Notification/NotificationService"));
const bullConfig_1 = require("../bullConfig");
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const generationToken_1 = __importDefault(require("../utils/generationToken"));
class AuthenticationController {
    constructor() {
        this.path = '/auth';
        this.router = express.Router();
        this.registration = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_models_1.default.create(Object.assign({}, request.body));
                const optMailvlue = {
                    from: "waelismael07@gmail.com",
                    to: "waelelsafty07@gmail.com",
                    subject: "Activate Account",
                    html: "hello",
                };
                try {
                    yield bullConfig_1.sendMailQueue.add(new NotificationService_1.default([new EmailService_1.default(optMailvlue)]).Notify());
                }
                catch (error) {
                    console.log(error);
                }
                response.json({ msg: "added", user });
            }
            catch (err) {
                response.json({ msg: "added", err });
            }
        });
        this.loggingIn = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield users_models_1.default.findOne({
                where: { email: request.body.email }
            });
            if (!user || !(yield bcrypt.compare(request.body.password, user.password))) {
                return next(new HttpException_1.default(404, "Incorrect email or password"));
            }
            const payload = {
                usrID: user.id,
                email: user.email,
            };
            const token = new generationToken_1.default(payload).genrate("2d");
            response.json({ msg: "added", user, token });
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, this.registration);
        this.router.post(`${this.path}/login`, this.loggingIn);
    }
}
exports.default = AuthenticationController;
