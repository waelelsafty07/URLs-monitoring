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
const app_1 = __importDefault(require("./app"));
const validateENV_1 = __importDefault(require("./utils/validateENV"));
const authentication_controller_1 = __importDefault(require("./authentication/authentication.controller"));
const config_1 = __importDefault(require("./config"));
const emailConfig_1 = __importDefault(require("./emailConfig"));
const healthcheck_controller_1 = __importDefault(require("./healthcheck/healthcheck.controller"));
const reports_controller_1 = __importDefault(require("./reports/reports.controller"));
(0, validateENV_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    emailConfig_1.default.verify(function (error, success) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Mail server is running...");
        }
    });
    config_1.default.sync().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });
    const app = new app_1.default([
        new authentication_controller_1.default(),
        new healthcheck_controller_1.default(),
        new reports_controller_1.default()
    ], Number(process.env.PORT));
    app.listen();
}))();
