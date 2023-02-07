"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    (0, envalid_1.cleanEnv)(process.env, {
        DB_USER: (0, envalid_1.str)(),
        DB_PASSWORD: (0, envalid_1.str)(),
        DB_HOST: (0, envalid_1.str)(),
        DB_PORT: (0, envalid_1.port)(),
        DB_DB: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)(),
    });
}
exports.default = validateEnv;
