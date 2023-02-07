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
exports.createFailedRequest = void 0;
const bullConfig_1 = require("../../bullConfig");
const report_models_1 = __importDefault(require("../../models/report.models"));
const NotificationService_1 = __importDefault(require("../../utils/Notification/NotificationService"));
class createFailedRequest {
    constructor(interval, id, thresholdUrl, realThreshold, notify) {
        this.interval = interval;
        this.id = id;
        this.createReport(thresholdUrl, realThreshold, notify);
    }
    createReport(thresholdUrl, currentThreshold, notify) {
        return __awaiter(this, void 0, void 0, function* () {
            if (thresholdUrl == currentThreshold) {
                yield bullConfig_1.sendMailQueue.add(new NotificationService_1.default(notify).Notify());
            }
            yield report_models_1.default.create({
                status: "failed",
                downtime: this.interval,
                urlId: this.id
            });
        });
    }
}
exports.createFailedRequest = createFailedRequest;
