"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRoutes;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
function userRoutes(controller) {
    const router = (0, express_1.Router)();
    router.get("/", authMiddleware_1.authMiddleware, controller.getAllUsers.bind(controller));
    router.get("/:id", authMiddleware_1.authMiddleware, validationMiddleware_1.validateIdInURLParam, controller.getUserById.bind(controller));
    router.post("/", validationMiddleware_1.validateUser, controller.createUser.bind(controller));
    return router;
}
