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
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const belongTo_middleware_1 = __importDefault(require("../middleware/belongTo.middleware"));
const protect_middleware_1 = __importDefault(require("../middleware/protect.middleware"));
class ReportsController {
    constructor() {
        this.path = '/generateReport';
        this.router = express.Router();
        this.gerationById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const anaylis = this.anaylisQuery(Number(request.params.id));
                const history = this.historyQuery(Number(request.params.id));
                const data = yield Promise.all([anaylis, history]);
                response.json({ msg: "added", data });
            }
            catch (err) {
                response.json({ msg: "added", err });
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:id`, protect_middleware_1.default, belongTo_middleware_1.default, this.gerationById);
    }
    anaylisQuery(id) {
        const anaylis = config_1.default.query(`
            SELECT 
                status as currentStatus ,
                SUM(uptime) as uptimeTotal,
                SUM(downtime)as downtimeTotal,
                (SUM(uptime) / (SUM(uptime) + SUM(downtime)))*100 as availability,
                AVG(responseTime) as responseTimeAVG
            FROM reports WHERE urlId = ${id} ORDER BY createdAT DESC
            `, { type: sequelize_1.QueryTypes.SELECT });
        return anaylis;
    }
    historyQuery(id) {
        const history = config_1.default.query(`
            SELECT * FROM reports WHERE urlId = ${id} ORDER BY id LIMIT 50
            `, { type: sequelize_1.QueryTypes.SELECT });
        return history;
    }
}
exports.default = ReportsController;
