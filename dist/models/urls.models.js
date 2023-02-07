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
exports.scheduleUrl = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const users_models_1 = __importDefault(require("./users.models"));
const node_cron_1 = __importDefault(require("node-cron"));
const report_models_1 = __importDefault(require("./report.models"));
const healthcheckRequest_1 = __importDefault(require("../healthcheck/healthcheckRequest"));
const InitilaizeNotification_1 = require("../healthcheck/utils/InitilaizeNotification");
// import Reports from "./report.models";
class Urls extends sequelize_1.Model {
}
Urls.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    url: {
        type: sequelize_1.DataTypes.STRING
    },
    protocol: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["HTTP", "HTTPS", "TCP"]
    },
    path: {
        type: sequelize_1.DataTypes.STRING
    },
    port: {
        type: sequelize_1.DataTypes.INTEGER
    },
    timeout: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 5
    },
    interval: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 10,
        validate: {
            max: 59,
            min: 1
        }
    },
    threshold: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
    },
    authUsername: {
        type: sequelize_1.DataTypes.STRING
    },
    authPassword: {
        type: sequelize_1.DataTypes.STRING
    },
    statusCode: {
        type: sequelize_1.DataTypes.INTEGER
    },
    tags: {
        type: sequelize_1.DataTypes.STRING
    },
    webhook: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["email"],
        defaultValue: "email"
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    sequelize: config_1.default,
    tableName: "urls",
});
Urls.belongsTo(users_models_1.default, {
    foreignKey: "userId",
    as: "user",
});
const alertMailvlue = {
    from: "waelismael07@gmail.com",
    to: "waelelsafty07@gmail.com",
    subject: "Notify Url",
    html: "Failed",
};
report_models_1.default.belongsTo(Urls, {
    foreignKey: "urlId",
    as: "urls",
});
Urls.afterCreate((urls, options) => __awaiter(void 0, void 0, void 0, function* () {
    (0, exports.scheduleUrl)(urls);
}));
const scheduleUrl = (urls) => __awaiter(void 0, void 0, void 0, function* () {
    const notify = new InitilaizeNotification_1.InitilaizeNotification(urls.webhook, alertMailvlue).notification();
    try {
        node_cron_1.default.schedule(`*/${urls.interval} * * * *`, () => __awaiter(void 0, void 0, void 0, function* () {
            new healthcheckRequest_1.default(urls, urls.id, notify);
        }), {
            timezone: "Africa/Cairo"
        });
    }
    catch (err) {
    }
});
exports.scheduleUrl = scheduleUrl;
exports.default = Urls;
