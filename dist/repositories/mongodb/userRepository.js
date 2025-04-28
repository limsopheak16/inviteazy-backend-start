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
exports.MongoUserRepository = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("./models/userModel");
class MongoUserRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userModel_1.UserModel.find();
            return result.map(({ id, name, email, role }) => ({
                id,
                name,
                email,
                role,
            }));
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userModel_1.UserModel.findById(userId);
            if (!result)
                return null;
            const { id, name, email, role } = result;
            return { id, name, email, role };
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_1.UserModel.findOne({ email });
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
            const newUser = new userModel_1.UserModel({
                name: user.name,
                email: user.email,
                password: hashedPassword,
                role: user.role,
            });
            yield newUser.save();
            const { id, name, email, role } = newUser;
            return { id, name, email, role };
        });
    }
}
exports.MongoUserRepository = MongoUserRepository;
