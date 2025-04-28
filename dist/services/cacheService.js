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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
class RedisCacheService {
    constructor() {
        this.client = (0, redis_1.createClient)({
            url: process.env.REDIS_URL || "redis://localhost:6379",
            socket: {
                reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
            },
        });
        this.client.on("error", (err) => console.log("Redis Client Error", err));
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                console.log("Connected to Redis");
            }
            catch (err) {
                console.log("Redis connection error:", err);
            }
        });
    }
    static getInstance() {
        if (!RedisCacheService.instance) {
            RedisCacheService.instance = new RedisCacheService();
        }
        return RedisCacheService.instance;
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.get(key);
            }
            catch (error) {
                console.error("Redis get error:", error);
                return null;
            }
        });
    }
    set(key, value, expirationInSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (expirationInSeconds) {
                    yield this.client.setEx(key, expirationInSeconds, value);
                }
                else {
                    yield this.client.set(key, value);
                }
            }
            catch (error) {
                console.error("Redis set error:", error);
            }
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.del(key);
            }
            catch (error) {
                console.error("Redis delete error:", error);
            }
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.flushAll();
            }
            catch (error) {
                console.error("Redis clear error:", error);
            }
        });
    }
}
exports.default = RedisCacheService.getInstance();
