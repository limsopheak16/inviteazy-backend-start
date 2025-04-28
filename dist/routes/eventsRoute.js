"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventsRoutes;
const express_1 = require("express");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const authMiddleware_1 = require("../middlewares/authMiddleware");
function EventsRoutes(controller) {
    const router = (0, express_1.Router)();
    router.post("/", authMiddleware_1.authMiddleware, validationMiddleware_1.validateEvent, controller.createEvent.bind(controller));
    router.get("/getAll", authMiddleware_1.authMiddleware, controller.getAllEvents.bind(controller));
    return router;
}
