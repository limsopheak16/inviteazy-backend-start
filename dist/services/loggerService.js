"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LoggerService = void 0;
const winston_1 = __importDefault(require("winston"));
class LoggerService {
    constructor() {
        this.level = process.env.NODE_ENV === "development" ? "debug" : "info";
        this.logger = winston_1.default.createLogger({
            level: this.level,
            format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.json(), winston_1.default.format.printf((info) => {
                const { timestamp, level, message } = info, metadata = __rest(info, ["timestamp", "level", "message"]);
                const metadataStr = Object.keys(metadata).length
                    ? ` ${JSON.stringify(metadata, null, 2)}`
                    : "";
                return `${timestamp} [${level.toUpperCase()}]: ${message}${metadataStr}`;
            })),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({
                    filename: "logs/error.log",
                    level: "error",
                }),
                new winston_1.default.transports.File({ filename: "logs/combined.log" }),
            ],
        });
    }
    info(message, meta) {
        this.logger.info(message, meta);
    }
    error(message, meta) {
        this.logger.error(message, meta);
    }
    warn(message, meta) {
        this.logger.warn(message, meta);
    }
    debug(message, meta) {
        this.logger.debug(message, meta);
    }
}
exports.LoggerService = LoggerService;
// Singleton instance
exports.logger = new LoggerService();
