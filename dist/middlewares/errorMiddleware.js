"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const loggerService_1 = require("../services/loggerService");
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    console.error(`[${req.method}] ${req.path} - Error: ${message}`);
    loggerService_1.logger.error("Error occurred", {
        method: req.method,
        url: req.url,
        status,
        message,
        stack: err.stack,
    });
    res.status(status).json({
        status: "error",
        statusCode: status,
        message,
    });
};
exports.errorMiddleware = errorMiddleware;
