import express from 'express';
import * as bodyParser from 'body-parser';

import errorMiddleware from './middleware/error.middleware';
import { SchduleQueue } from './bullConfig';
import { fetchUrl } from './healthcheck/fetchUrl/fetchUrl';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeScheduler();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: any) {

    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router);
    });

  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  private async initializeScheduler() {
    await SchduleQueue.add(fetchUrl())
  }
}

export default App;