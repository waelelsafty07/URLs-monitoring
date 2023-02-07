"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const jwt = require("jsonwebtoken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class GenerationToken {
    constructor(payload) {
        this.payload = payload;
    }
    genrate(ExpireTime) {
        const token = jsonwebtoken_1.default.sign(this.payload, String(process.env.JWT_SECRET_KEY), {
            expiresIn: ExpireTime,
        });
        return token;
    }
}
exports.default = GenerationToken;
