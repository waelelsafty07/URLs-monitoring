"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchduleQueue = exports.sendMailQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const { REDIS_URL } = process.env;
// Initiating the Queue with a redis instance
exports.sendMailQueue = new bull_1.default('sendMail', String(REDIS_URL));
exports.SchduleQueue = new bull_1.default('Schdule', String(REDIS_URL));
exports.sendMailQueue.process((job, done) => {
    done();
});
exports.SchduleQueue.process((job, done) => {
    console.log(job.data);
    done();
});
// export default { sendMailQueue, SchduleQueue };
