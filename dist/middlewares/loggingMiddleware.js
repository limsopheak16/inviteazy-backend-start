"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = loggingMiddleware;
const loggerService_1 = require("../services/loggerService");
const sanitizeRequestData_1 = require("../utils/sanitizeRequestData");
function loggingMiddleware(req, res, next) {
    const startTime = Date.now();
    // Sanitize the request data
    const sanitizedRequestLog = (0, sanitizeRequestData_1.sanitizeRequestData)(req);
    loggerService_1.logger.info("Request received", sanitizedRequestLog);
    const originalSend = res.send;
    res.send = function (body) {
        const duration = Date.now() - startTime;
        // Mask all fields in the response body
        const maskedBody = (0, sanitizeRequestData_1.maskResponseBody)(typeof body === "string" ? JSON.parse(body) : body);
        const responseLog = {
            status: res.statusCode,
            body: typeof maskedBody === "string" ? maskedBody : JSON.stringify(maskedBody),
            duration: `${duration}ms`,
        };
        loggerService_1.logger.info("Response sent", responseLog);
        return originalSend.call(this, body);
    };
    next();
}
