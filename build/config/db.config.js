"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('app', '', '', {
    storage: process.env.DB_PATH || './db.sqlite',
    dialect: 'sqlite',
    logging: false,
});
exports.default = db;
