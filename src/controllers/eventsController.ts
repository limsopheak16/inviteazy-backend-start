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

      console.log("📅 Creating Event:", { name, dateTime, location, description });

      const newEvent = await this.eventService.createEvent({
        name,
        dateTime,
        location,
        description,
        userId: req.userId,
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
