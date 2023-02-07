import { Sequelize } from "sequelize"
import * as dotenv from 'dotenv' 

dotenv.config()

const db = new Sequelize(
    String(process.env.DB_DB),
    String(process.env.DB_USER),
    String(process.env.DB_PASSWORD),
     {
       host: process.env.DB_HOST,
       dialect: 'mysql'
     }
   );
export default db