"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryWithLogging = queryWithLogging;
const loggerService_1 = require("../../services/loggerService");
const crypto_1 = __importDefault(require("crypto")); // Import Node.js crypto module for hashing
// Function to hash all parameters
function hashParams(params) {
    return params.map((param) => {
        if (typeof param === "string" || typeof param === "number") {
            // Hash the parameter (convert numbers to strings before hashing)
            return crypto_1.default.createHash("sha256").update(String(param)).digest("hex");
        }
        return param; // Return non-string/non-number parameters as-is
    });
}
function queryWithLogging(pool_1, sql_1) {
    return __awaiter(this, arguments, void 0, function* (pool, sql, params = [], requestId) {
        const startTime = Date.now();
        try {
            const result = yield pool.query(sql, params);
            const duration = Date.now() - startTime;
            // Hash all params before logging
            const hashedParams = hashParams(params);
            loggerService_1.logger.info("Database query executed", {
                requestId,
                sql,
                params: hashedParams, // Log hashed params
                rowCount: result.rowCount,
                duration: `${duration}ms`,
            });
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                const duration = Date.now() - startTime;
                // Hash all params before logging
                const hashedParams = hashParams(params);
                loggerService_1.logger.error("Database query failed", {
                    requestId,
                    sql,
                    params: hashedParams, // Log hashed params
                    error: error.message,
                    duration: `${duration}ms`,
                });
            }
            throw error;
        }
    });
}
