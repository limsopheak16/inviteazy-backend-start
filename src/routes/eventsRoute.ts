import { Router } from "express";
import { validateEvent } from "../middlewares/validationMiddleware";
import { EventController } from "../controllers/eventsController";
import { authMiddleware } from "../middlewares/authMiddleware";

export default function EventsRoutes(controller: EventController): Router {
  const router = Router();

  router.post("/",authMiddleware, validateEvent ,controller.createEvent.bind(controller));
  router.get("/getAll", authMiddleware, controller.getAllEvents.bind(controller));

  return router;
}