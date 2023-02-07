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
Object.defineProperty(exports, "__esModule", { value: true });
const createFailedRequest_1 = require("./utils/createFailedRequest");
const createSuccessRequest_1 = require("./utils/createSuccessRequest");
const InitializedRequest_1 = require("./utils/InitializedRequest");
class healthcheckRequest extends InitializedRequest_1.InitializedRequest {
    constructor(url, urlId, notify) {
        super();
        this.urlId = urlId;
        this.notify = notify;
        this.requestUrl(url);
    }
    requestUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.instanceRequest().get(url.url, {
                    timeout: url.timeout * 1000
                });
                if (!res)
                    new createFailedRequest_1.createFailedRequest(url.interval, this.urlId, url.threshold, this.thresholdIncrease(), this.notify);
                new createSuccessRequest_1.createSuccessRequest(url.interval, res.headers['request-duration'], this.urlId);
            }
            catch (err) {
                new createFailedRequest_1.createFailedRequest(url.interval, this.urlId, url.threshold, this.thresholdIncrease(), this.notify);
            }
        });
    }
}
exports.default = healthcheckRequest;
