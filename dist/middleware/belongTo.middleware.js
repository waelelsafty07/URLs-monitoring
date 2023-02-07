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
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const urls_models_1 = __importDefault(require("../models/urls.models"));
const belongToMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const url = yield urls_models_1.default.findByPk(request.params.id);
    if (!url)
        next(new HttpException_1.default(404, "not Founded"));
    if ((url === null || url === void 0 ? void 0 : url.userId) !== request.user.id)
        next(new HttpException_1.default(401, "not allowed"));
    next();
});
exports.default = belongToMiddleware;
