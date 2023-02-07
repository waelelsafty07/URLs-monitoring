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
const express = __importStar(require("express"));
const protect_middleware_1 = __importDefault(require("../middleware/protect.middleware"));
const setIdUser_middleware_1 = __importDefault(require("../middleware/setIdUser.middleware"));
const urls_models_1 = __importDefault(require("../models/urls.models"));
class HealthcheckController {
    constructor() {
        this.path = '/healthcheck';
        this.router = express.Router();
        this.postUrl = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const Url = yield urls_models_1.default.create(Object.assign({}, request.body));
                response.json({ msg: "added", Url });
            }
            catch (err) {
                response.json({ msg: "added", err });
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/`, protect_middleware_1.default, setIdUser_middleware_1.default, this.postUrl);
    }
}
const alertMailvlue = {
    from: "waelismael07@gmail.com",
    to: "waelelsafty07@gmail.com",
    subject: "Notify Url",
    html: "Failed",
};
exports.default = HealthcheckController;
