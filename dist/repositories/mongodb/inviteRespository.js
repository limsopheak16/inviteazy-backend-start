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
exports.MongoInviteRepository = void 0;
const inviteModel_1 = require("./models/inviteModel");
class MongoInviteRepository {
    // Removed duplicate implementation of findAllAcceptByenventID
    findinvitebyuserID(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield inviteModel_1.InviteModel.find({ userId });
        });
    }
    // Removed duplicate implementation of updateCheckOutStatus
    getAllInvites() {
        return __awaiter(this, void 0, void 0, function* () {
            const invites = yield inviteModel_1.InviteModel.find();
            if (!invites.length)
                return null;
            return invites.map(invite => this.toInvite(invite));
        });
    }
    updateInvitestatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield inviteModel_1.InviteModel.findByIdAndUpdate(id, { status }, { new: true });
            return updated ? this.toInvite(updated) : null;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const invite = yield inviteModel_1.InviteModel.findById(id);
            return invite ? this.toInvite(invite) : null;
        });
    }
    updateCheckinStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield inviteModel_1.InviteModel.findByIdAndUpdate(id, { is_checked_in: true, check_in_time: new Date() }, { new: true });
            return updated ? this.toInvite(updated) : null;
        });
    }
    findAllAcceptByenventID(eventID) {
        return __awaiter(this, void 0, void 0, function* () {
            const invites = yield inviteModel_1.InviteModel.find({ event_id: eventID, status: "accepted" });
            return invites.length ? invites.map(this.toInvite) : null;
        });
    }
    findAllcheckinByenventID(eventID) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkInCount = yield inviteModel_1.InviteModel.countDocuments({ event_id: eventID, is_checked_in: true });
            return checkInCount > 0 ? { check_in_count: checkInCount } : null;
        });
    }
    findAllmoneyByenventID(eventID) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // const checkInCount = await InviteModel.countDocuments({ event_id: eventID, is_checked_out: true });
            const totalGiftAmount = yield inviteModel_1.InviteModel.aggregate([
                { $match: { event_id: eventID, is_checked_out: true } },
                { $group: { _id: null, total: { $sum: "$gift" } } }
            ]);
            return totalGiftAmount.length > 0
                ? { total_gift_amount: ((_a = totalGiftAmount[0]) === null || _a === void 0 ? void 0 : _a.total) || null }
                : null;
        });
    }
    create(invite) {
        return __awaiter(this, void 0, void 0, function* () {
            const newInvite = new inviteModel_1.InviteModel(invite);
            yield newInvite.save();
            return this.toInvite(newInvite);
        });
    }
    findInviteByUserID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const invites = yield inviteModel_1.InviteModel.find({ user_id: userID });
            if (!invites.length)
                return null;
            return invites.map(this.toInvite);
        });
    }
    updateCheckOutStatus(invite, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield inviteModel_1.InviteModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, invite), { is_checked_out: true, check_out_time: new Date() }), { new: true });
            return updated ? this.toInvite(updated) : null;
        });
    }
    // ✅ Helper to map Mongoose document to Invite interface
    toInvite(doc) {
        return {
            id: doc._id.toString(),
            event_id: doc.event_id,
            user_id: doc.user_id,
            status: doc.status,
            qr_code: doc.qr_code,
            is_checked_in: doc.is_checked_in,
            check_in_time: doc.check_in_time,
            is_checked_out: doc.is_checked_out,
            check_out_time: doc.check_out_time,
            gift: doc.gift,
        };
    }
}
exports.MongoInviteRepository = MongoInviteRepository;
