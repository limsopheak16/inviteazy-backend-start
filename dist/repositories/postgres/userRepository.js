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
exports.PostgresUserRepository = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("./utils");
class PostgresUserRepository {
    constructor(pool) {
        this.pool = pool;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, "SELECT id, name, email,role FROM users");
            return rows;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, "SELECT id, name, email, role FROM users WHERE id = $1", [id]);
            return rows[0] || null;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, "SELECT * FROM users WHERE email = $1", [email]);
            return rows[0] || null;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role", [user.name, user.email, hashedPassword, user.role]);
            return rows[0];
        });
    }
}
exports.PostgresUserRepository = PostgresUserRepository;
