import { Router } from "express";
import { InviteController } from "../controllers/InviteController";
import { authMiddleware } from "../middlewares/authMiddleware";

export default function inviteRoutes(
  controller: InviteController
): Router {
  const router = Router();

  router.get("/events/:event_id", authMiddleware, controller.getAllAcceptByenventID.bind(controller));  // router.get("/:id", controller.getInviteById.bind(controller));
  router.post("/events/:event_id/invite",authMiddleware, controller.createInvite.bind(controller));
  router.get("/invitations", authMiddleware, controller.getAllInvites.bind(controller));
  router.patch("/invitations/:id",authMiddleware, controller.updateInvitestatus.bind(controller));
  router.get("/invitations/:id", authMiddleware, controller.findbyId.bind(controller));
  router.patch("/invitations/:id/checkin", authMiddleware, controller.updateCheckinStatus.bind(controller));
  router.patch("/invitations/:id/checkout", authMiddleware, controller.updateCheckOutStatus.bind(controller));
  // router.delete("/:id", controller.deleteInvite.bind(controller));

  return router;
}