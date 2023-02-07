import { DataTypes, Model } from "sequelize";
import db from "../config";


class Reports extends Model {
}
Reports.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        status: {
            type: DataTypes.ENUM,
            values: ["success", "failed"]
        },
        uptime: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        downtime: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        responseTime: {
            type: DataTypes.INTEGER
        },
        urlId: {
            type: DataTypes.INTEGER
        }
    }, {
    sequelize: db,
    tableName: "reports",
}

);





const CalculateTimeRespone = (instance: any) => {
    instance.interceptors.request.use((config: any) => {
        config.headers['request-startTime'] = process.hrtime()
        return config
    })
    instance.interceptors.response.use((response: any) => {
        const start = response.config.headers['request-startTime']
        const end = process.hrtime(start)
        const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000))
        response.headers['request-duration'] = milliseconds
        return response
    })
}

export default Reports;