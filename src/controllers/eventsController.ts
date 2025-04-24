import { NextFunction, Request, Response } from "express";
import { Event, EventService } from "../interfaces/eventsInterface";

interface AuthRequest extends Request {
  userId?: any;
}
export class EventController {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  async createEvent(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
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

      const newEvent = await this.eventService.createEvent({
        userId: req.userId,
        name,
        dateTime,
        location,
        description,
      });

      res.status(201).json({
        message: " A new event was created.",
        data: newEvent,
      });
    } catch (error) {
      console.error("❌ Error creating event:", error);
      next(error);
    }
  }

  async getAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.eventService.getAllEvents();
      res.json({ message: "📦 All events fetched.", data: result });
    } catch (error) {
      next(error);
    }
  }
}
