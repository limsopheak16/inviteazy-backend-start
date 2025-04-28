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
exports.EventController = void 0;
class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    createEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, dateTime, location, description } = req.body;
                // ✅ Fix: properly access user ID from the object
                // const {id} = req.userId;
                // console.log('hhhhh',id)
                // if (!id) {
                //   res.status(400).json({ message: "❌ User ID missing from request." });
                //   return;
                // }
                console.log("📅 Creating Event:", { name, dateTime, location, description });
                const newEvent = yield this.eventService.createEvent({
                    name,
                    dateTime,
                    location,
                    description,
                    userId: req.userId,
                });
                res.status(201).json({
                    message: " A new event was created.",
                    data: newEvent,
                });
            }
            catch (error) {
                console.error("❌ Error creating event:", error);
                next(error);
            }
        });
    }
    getAllEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.eventService.getAllEvents();
                res.json({ message: "📦 All events fetched.", data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.EventController = EventController;
