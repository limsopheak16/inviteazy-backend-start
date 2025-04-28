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
exports.inviteService = void 0;
class inviteService {
    constructor(inviteRepository, userRepository) {
        this.inviteRepository = inviteRepository;
        this.userRepository = userRepository;
    }
    findAllcheckinByenventID(eventID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviteRepository.findAllcheckinByenventID(eventID);
        });
    }
    findAllmoneyByenventID(eventID) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.inviteRepository.findAllmoneyByenventID(eventID);
            return result ? Object.assign({}, result) : null;
        });
    }
    getAllAcceptByenventID(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviteRepository.findAllAcceptByenventID(eventId);
        });
    }
    getAllcheckinByenventID(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviteRepository.findAllcheckinByenventID(eventId);
        });
    }
    getAllmoneyByenventID(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.inviteRepository.findAllmoneyByenventID(eventId);
            return result ? Object.assign({}, result) : null;
        });
    }
    findAllAcceptByenventID(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviteRepository.findAllAcceptByenventID(eventId);
        });
    }
    createInvite(invite) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviteRepository.create(invite);
        });
    }
    findinvitebyuserID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviteRepository.findinvitebyuserID(userID);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(id);
            if (!user) {
                throw Object.assign(new Error("User not found"), { status: 404 });
            }
            return user;
        });
    }
    getAllInvites() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviteRepository.getAllInvites();
        });
    }
    updateInvitestatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviteRepository.updateInvitestatus(id, status);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviteRepository.findById(id);
        });
    }
    updateCheckinStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviteRepository.updateCheckinStatus(id);
        });
    }
    updateCheckOutStatus(invite, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviteRepository.updateCheckOutStatus(invite, id);
        });
    }
}
exports.inviteService = inviteService;
