"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoutes;
const express_1 = require("express");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
function authRoutes(controller) {
    const router = (0, express_1.Router)();
    router.post("/login", validationMiddleware_1.validateLogin, controller.login.bind(controller));
    router.post("/register", controller.register.bind(controller));
    return router;
}
