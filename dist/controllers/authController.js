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
exports.AuthController = void 0;
class AuthController {
    constructor(userService) {
        this.userService = userService;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield this.userService.login(email, password);
                res.status(200).json({ message: "Login successfully.", data: result });
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, role = "user" } = req.body;
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
exports.AuthController = AuthController;
