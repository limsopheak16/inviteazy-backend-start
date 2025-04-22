import { EventModel } from "./models/eventModel";
import {
  Event,
  EventRepository,
} from "../../interfaces/eventsInterface";

export class MongoEventRepository implements EventRepository {
  async findAll(): Promise<Event[]> {
    const events = await EventModel.find();
    return events.map(({ _id, name, dateTime, location, description, userId }) => ({
      _id,
      name,
      dateTime,
      location,
      description,
      userId
    }));
  }

  async findById(id: string): Promise<Event | null> {
    const event = await EventModel.findById(id);
    if (!event) return null;
    return {
      _id: event._id,
      name: event.name,
      dateTime: event.dateTime,
      location: event.location,
      description: event.description,
      userId: event.userId, // ✅ Add this line
    };
  }

  async create(event: Omit<Event, "_id">): Promise<Event> {
    const newEvent = new EventModel(event);
    await newEvent.save();
    return {
      _id: newEvent._id,
      name: newEvent.name,
      dateTime: newEvent.dateTime,
      location: newEvent.location,
      description: newEvent.description,
      userId: newEvent.userId, // ✅ Add this line
    };
  }
}
