"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMysqlDb = void 0;
const promise_1 = require("mysql2/promise");
const connectMysqlDb = () => {
    const connection = (0, promise_1.createPool)({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
    });
    return connection;
};
exports.connectMysqlDb = connectMysqlDb;
