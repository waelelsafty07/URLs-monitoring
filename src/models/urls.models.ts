import { DataTypes, Model } from "sequelize";
import axios from "axios";
import db from "../config";
import User from "./users.models";
import cron from 'node-cron';
import Reports from "./report.models";
import healthcheckRequest from "../healthcheck/healthcheckRequest";
import { InitilaizeNotification } from "../healthcheck/utils/InitilaizeNotification";
import { SchduleQueue } from "../bullConfig";
import { Worker } from "bullmq";
// import Reports from "./report.models";



class Urls extends Model {
    declare id: number;
    declare webhook: string;
    declare interval: number;
    declare threshold: number;
    declare url: string;
    declare timeout: number;
    declare authUsername: string;
    declare authPassword: string;
    declare protocol: string;
    declare port: number;
    declare userId: number;

}
Urls.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },
        protocol: {
            type: DataTypes.ENUM,
            values: ["HTTP", "HTTPS", "TCP"]
        },
        path: {
            type: DataTypes.STRING
        },
        port: {
            type: DataTypes.INTEGER
        },
        timeout: {
            type: DataTypes.INTEGER,
            defaultValue: 5
        },
        interval: {
            type: DataTypes.INTEGER,
            defaultValue: 10,
            validate: {
                max: 59,
                min: 1
            }


        },
        threshold: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        authUsername: {
            type: DataTypes.STRING
        },
        authPassword: {
            type: DataTypes.STRING
        },
        statusCode: {
            type: DataTypes.INTEGER
        },
        tags: {
            type: DataTypes.STRING
        },
        webhook: {
            type: DataTypes.ENUM,
            values: ["email"],
            defaultValue: "email"
        },
        userId: {
            type: DataTypes.INTEGER
        }
    }, {
    sequelize: db,
    tableName: "urls",
}

);

Urls.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});
const alertMailvlue = {
    from: "waelismael07@gmail.com",
    to: "waelelsafty07@gmail.com",
    subject: "Notify Url",
    html: "Failed",
}
Reports.belongsTo(Urls, {
    foreignKey: "urlId",
    as: "urls",
});

Urls.afterCreate(async (urls, options) => {
    scheduleUrl(urls)
})

export const scheduleUrl = async (urls: any) => {
    const notify = new InitilaizeNotification(urls.webhook, alertMailvlue).notification()
    try {
        cron.schedule(`*/${urls.interval} * * * *`, async () => {
            new healthcheckRequest(urls, urls.id, notify)
        }, {
            timezone: "Africa/Cairo"
        });
    } catch (err) {

    }
}

export default Urls;