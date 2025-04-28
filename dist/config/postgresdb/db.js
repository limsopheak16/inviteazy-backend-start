"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectPostgresDb = void 0;
const pg_1 = require("pg");
const connectPostgresDb = () => {
    const pool = new pg_1.Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT ? parseInt(process.env.DB_PORT || "5432") : 5432,
    });
    return pool;
};
exports.connectPostgresDb = connectPostgresDb;
