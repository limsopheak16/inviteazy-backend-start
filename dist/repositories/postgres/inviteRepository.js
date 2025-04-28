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
exports.PostgresInviteRepository = void 0;
const utils_1 = require("./utils");
class PostgresInviteRepository {
    constructor(pool) {
        this.pool = pool;
    }
    findAllAcceptByenventID(eventID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.queryWithLogging)(this.pool, "SELECT id, event_id, user_id, status, qr_code, is_checked_in, check_in_time, create_at,is_checked_out,checked_out_time,gift FROM public.invitation WHERE status = $1 AND event_id = $2;", ["accepted", eventID]).then((result) => result.rows || null);
        });
    }
    findAllcheckinByenventID(eventID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.queryWithLogging)(this.pool, `SELECT COUNT(*) 
FROM public.invitation
WHERE event_id = $1
  AND is_checked_in = true;`, [eventID]).then((result) => result.rows[0] || null);
        });
    }
    findAllmoneyByenventID(eventID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.queryWithLogging)(this.pool, `SELECT
  SUM(gift)
FROM public.invitation
WHERE event_id = $1;`, [eventID]).then((result) => result.rows[0] || null);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.queryWithLogging)(this.pool, "SELECT id, event_id, user_id, status, qr_code, is_checked_in, check_in_time, create_at,is_checked_out,checked_out_time,gift FROM public.invitation WHERE id = $1", [id]).then((result) => result.rows[0] || null);
        });
    }
    findinvitebyuserID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.queryWithLogging)(this.pool, "SELECT id, event_id, user_id, status, qr_code, is_checked_in, check_in_time, create_at,is_checked_out,checked_out_time,gift FROM public.invitation WHERE user_id = $1", [userID]).then((result) => result.rows || null);
        });
    }
    create(invite) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const insertRes = yield client.query(`INSERT INTO public.invitation (event_id, user_id, status, qr_code, is_checked_in, check_in_time,is_checked_out,checked_out_time,gift) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, event_id, user_id, status, qr_code, is_checked_in, check_in_time, create_at, is_checked_out, checked_out_time, gift`, [invite.event_id, invite.user_id, invite.status, invite.qr_code, invite.is_checked_in, invite.check_in_time, invite.is_checked_out, invite.check_out_time, invite.gift]);
                return insertRes.rows[0];
            }
            catch (err) {
                throw err;
            }
            finally {
                client.release();
            }
        });
    }
    updateInvitestatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { status } = invite; // Extract the status field from the invite object
            if (!status) {
                throw new Error("Only the 'status' field can be updated using this method.");
            }
            return (0, utils_1.queryWithLogging)(this.pool, "UPDATE public.invitation SET status = $1 WHERE id = $2 RETURNING id, event_id, user_id, status, qr_code, is_checked_in, check_in_time,create_at,is_checked_out, checked_out_time,gift", [status, id]).then((result) => result.rows[0] || null);
        });
    }
    updateCheckinStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.queryWithLogging)(this.pool, "UPDATE public.invitation SET is_checked_in = true,check_in_time = NOW() WHERE id = $1 RETURNING id, event_id, user_id, status, qr_code, is_checked_in, check_in_time,create_at,is_checked_out, checked_out_time,gift", [id]).then((result) => result.rows[0] || null);
        });
    }
    updateCheckOutStatus(invite, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.queryWithLogging)(this.pool, "UPDATE public.invitation SET gift = $1, is_checked_out = true,checked_out_time = NOW() WHERE id = $2 RETURNING id, event_id, user_id, status, qr_code, is_checked_in, check_in_time,create_at,is_checked_out, checked_out_time,gift", [invite.gift, id]).then((result) => result.rows[0] || null);
        });
    }
    getAllInvites() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, utils_1.queryWithLogging)(this.pool, "SELECT id, event_id, user_id, status, qr_code, is_checked_in, check_in_time,create_at, is_checked_out,checked_out_time,gift FROM public.invitation").then((result) => result.rows || null);
        });
    }
}
exports.PostgresInviteRepository = PostgresInviteRepository;
