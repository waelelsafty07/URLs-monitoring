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
const emailConfig_1 = __importDefault(require("../../emailConfig"));
const NotifyService_1 = __importDefault(require("./NotifyService"));
class EmailService extends NotifyService_1.default {
    constructor(mailOpts) {
        super();
        this.mailOpts = {
            from: mailOpts.from,
            to: mailOpts.to,
            subject: mailOpts.subject,
            html: mailOpts.html,
        };
    }
    Send() {
        return __awaiter(this, void 0, void 0, function* () {
            emailConfig_1.default.sendMail(this.mailOpts);
        });
    }
}
exports.default = EmailService;
