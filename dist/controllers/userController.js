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
exports.UserController = void 0;
const cacheService_1 = __importDefault(require("../services/cacheService"));
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.baseUrl, req.originalUrl);
                const result = yield this.userService.getAllUsers();
                res.json({ message: "Get all users.", data: result });
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cacheKey = `data:${req.method}:${req.originalUrl}`;
                const cacheData = yield cacheService_1.default.get(cacheKey);
                if (cacheData) {
                    res.json({
                        message: "Cache: Get user by Id",
                        data: JSON.parse(cacheData),
                    });
                    return;
                }
                const { id } = req.params;
                const result = yield this.userService.getUserById(id);
                yield cacheService_1.default.set(cacheKey, JSON.stringify(result), 360);
                res.json({ message: "Api: Get user by Id", data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, role } = req.body;
                const newUser = yield this.userService.createUser({
                    name,
                    email,
                    password,
                    role,
                });
                res
                    .status(201)
                    .json({ message: "A new user was created.", data: newUser });
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
}
exports.UserController = UserController;
