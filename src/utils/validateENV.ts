
import {
    cleanEnv, str,port
  } from 'envalid';
   
function validateEnv() {
    cleanEnv(process.env, {
        DB_USER: str(),
        DB_PASSWORD: str(),
        DB_HOST: str(),
        DB_PORT: port(),
        DB_DB: str(),
        PORT: port(),
    });
  }
export default validateEnv