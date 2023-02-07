"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bullConfig_1 = require("../bullConfig");
bullConfig_1.sendMailQueue.process((job, done) => {
    console.log(job.data);
    done();
});
