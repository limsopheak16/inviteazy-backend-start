"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = inviteRoutes;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
function inviteRoutes(controller) {
    const router = (0, express_1.Router)();
    router.get("/events/:event_id", authMiddleware_1.authMiddleware, controller.getAllAcceptByenventID.bind(controller)); // router.get("/:id", controller.getInviteById.bind(controller));
    router.post("/events/:event_id/invite", authMiddleware_1.authMiddleware, controller.createInvite.bind(controller));
    router.get("/invitations", authMiddleware_1.authMiddleware, controller.getAllInvites.bind(controller));
    router.patch("/invitations/:id", authMiddleware_1.authMiddleware, controller.updateInvitestatus.bind(controller));
    router.get("/invitations/:id", authMiddleware_1.authMiddleware, controller.findbyId.bind(controller));
    router.patch("/invitations/:id/checkin", authMiddleware_1.authMiddleware, controller.updateCheckinStatus.bind(controller));
    router.get("/events/:eventId/guestinsight", authMiddleware_1.authMiddleware, controller.getGuestInsight.bind(controller));
    router.patch("/invitations/:id/checkout", authMiddleware_1.authMiddleware, controller.updateCheckOutStatus.bind(controller));
    return router;
}
