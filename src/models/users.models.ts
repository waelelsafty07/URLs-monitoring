import { DataTypes, Model } from "sequelize";
import db from "../config";
import bcrypt from "bcryptjs"

interface userAttributes {
    id: number;
    email: string;
    password: string;
}

class User extends Model<userAttributes>{
    declare id: number;
    declare email: string;
    declare password: string;
}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        }

    }, {
    sequelize: db,
    tableName: "users",
}

);
User.beforeCreate(async (user, options) => {
    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => {
            throw new Error();
        });
})
export default User;