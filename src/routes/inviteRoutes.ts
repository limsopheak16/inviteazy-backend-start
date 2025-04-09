import { Router } from "express";
import { InviteController } from "../controllers/InviteController";
import { authMiddleware } from "../middlewares/authMiddleware";

export default function inviteRoutes(
  controller: InviteController
): Router {
  const router = Router();

  router.get("/:event_id", authMiddleware, controller.getAllAcceptByenventID.bind(controller));  // router.get("/:id", controller.getInviteById.bind(controller));
  router.post("/", controller.createInvite.bind(controller));
  // router.put("/:id", controller.updateInvite.bind(controller));
  // router.delete("/:id", controller.deleteInvite.bind(controller));

  return router;
}