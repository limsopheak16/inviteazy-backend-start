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
exports.MongoEventRepository = void 0;
const eventModel_1 = require("./models/eventModel");
class MongoEventRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield eventModel_1.EventModel.find();
            return events.map(({ _id, name, dateTime, location, description, userId }) => ({
                _id,
                name,
                dateTime,
                location,
                description,
                userId
            }));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield eventModel_1.EventModel.findById(id);
            if (!event)
                return null;
            return {
                _id: event._id,
                name: event.name,
                dateTime: event.dateTime,
                location: event.location,
                description: event.description,
                userId: event.userId, // ✅ Add this line
            };
        });
    }
    create(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEvent = new eventModel_1.EventModel(event);
            yield newEvent.save();
            return {
                _id: newEvent._id,
                name: newEvent.name,
                dateTime: newEvent.dateTime,
                location: newEvent.location,
                description: newEvent.description,
                userId: newEvent.userId, // ✅ Add this line
            };
        });
    }
}
exports.MongoEventRepository = MongoEventRepository;
