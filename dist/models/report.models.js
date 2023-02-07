"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
class Reports extends sequelize_1.Model {
}
Reports.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    status: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["success", "failed"]
    },
    uptime: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    downtime: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    responseTime: {
        type: sequelize_1.DataTypes.INTEGER
    },
    urlId: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    sequelize: config_1.default,
    tableName: "reports",
});
const CalculateTimeRespone = (instance) => {
    instance.interceptors.request.use((config) => {
        config.headers['request-startTime'] = process.hrtime();
        return config;
    });
    instance.interceptors.response.use((response) => {
        const start = response.config.headers['request-startTime'];
        const end = process.hrtime(start);
        const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000));
        response.headers['request-duration'] = milliseconds;
        return response;
    });
};
exports.default = Reports;
