
import App from './app';
import validateEnv from './utils/validateENV';
import * as dotenv from 'dotenv'
import AuthenticationController from './authentication/authentication.controller';
import db from "./config"
import transporter from "./emailConfig"
import HealthcheckController from './healthcheck/healthcheck.controller';
import ReportsController from './reports/reports.controller';
import { SchduleQueue } from './bullConfig';
import Urls, { scheduleUrl } from './models/urls.models';

validateEnv();

(async () => {
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail server is running...");
    }
  });
  db.sync().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

  const app = new App(
    [
      new AuthenticationController(),
      new HealthcheckController(),
      new ReportsController()
    ],
    Number(process.env.PORT),
  );

  app.listen();
})();
