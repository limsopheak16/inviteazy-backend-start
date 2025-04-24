import { Router } from "express";
import { CheckinController } from "../controllers/checkinController";
import { authMiddleware } from "../middlewares/authMiddleware";
// import { validateCheckin } from "../middlewares/validationMiddleware";

export default function checkinRoutes(
    controller: CheckinController
    ): Router {
    const router = Router();
    
    // router.post("/", validateCheckin, controller.createCheckin.bind(controller));
    router.get(
        "/",
        authMiddleware,
        controller.getAllCheckinsByEventID.bind(controller)
    );
    router.post(
        "/",
        authMiddleware,
        controller.createCheckin.bind(controller)
    );
    
    return router;
    }