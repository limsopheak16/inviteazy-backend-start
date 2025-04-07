import { Router } from "express";
import { InviteController } from "../controllers/InviteController";

export default function inviteRoutes(
  controller: InviteController
): Router {
  const router = Router();

  router.get("/:event_id", controller.getAllAcceptByenventID.bind(controller));  // router.get("/:id", controller.getInviteById.bind(controller));
  router.post("/", controller.createInvite.bind(controller));
  // router.put("/:id", controller.updateInvite.bind(controller));
  // router.delete("/:id", controller.deleteInvite.bind(controller));

  return router;
}