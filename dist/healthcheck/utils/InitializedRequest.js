"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializedRequest = void 0;
const axios_1 = __importDefault(require("axios"));
class InitializedRequest {
    constructor() {
        this.instance = axios_1.default.create();
        this.threshold = 0;
        this.CalculateTimeRrquest = () => {
            this.instance.interceptors.request.use((config) => {
                config.headers['request-startTime'] = process.hrtime();
                return config;
            });
            this.instance.interceptors.response.use((response) => {
                const start = response.config.headers['request-startTime'];
                const end = process.hrtime(start);
                const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000));
                response.headers['request-duration'] = milliseconds;
                return response;
            });
        };
        this.CalculateTimeRrquest();
    }
    instanceRequest() {
        return this.instance;
    }
    thresholdIncrease() {
        return this.threshold += 1;
    }
}
exports.InitializedRequest = InitializedRequest;
