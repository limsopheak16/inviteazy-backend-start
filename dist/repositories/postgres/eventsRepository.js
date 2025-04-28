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
exports.PostgresEventRepository = void 0;
class PostgresEventRepository {
    constructor(pool) {
        this.pool = pool;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("SELECT id AS _id, name, datetime AS dateTime, location, description, user_id AS userId FROM public.events");
            return result.rows;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("SELECT id AS _id, name, date_time AS dateTime, location, description, user_id AS userId FROM public.events WHERE id = $1", [id]);
            if (result.rows.length === 0)
                return null;
            return result.rows[0];
        });
    }
    create(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query(`INSERT INTO public.events (name, datetime, location, description, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id AS _id, name, datetime AS dateTime, location, description, user_id AS userId`, [event.name, event.dateTime, event.location, event.description, event.userId]);
            return result.rows[0];
        });
    }
}
exports.PostgresEventRepository = PostgresEventRepository;
