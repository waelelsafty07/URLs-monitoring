"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const settingMail = {
    host: "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: String(process.env.EMAIL_USER),
        pass: String(process.env.EMAIL_PASSWORD),
    },
};
const transporter = nodemailer_1.default.createTransport(settingMail);
// checking connection
exports.default = transporter;
