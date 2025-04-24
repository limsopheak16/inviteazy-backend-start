import { Pool } from "pg";
import { Event, EventRepository } from "../../interfaces/eventsInterface";

export class PostgresEventRepository implements EventRepository {
  constructor(private pool: Pool) {}

  async findAll(): Promise<Event[]> {
    const result = await this.pool.query(
      "SELECT id AS _id, name, datetime AS dateTime, location, description, user_id AS userId FROM public.events"
    );
    return result.rows;
  }

  async findById(id: string): Promise<Event | null> {
    const result = await this.pool.query(
      "SELECT id AS _id, name, date_time AS dateTime, location, description, user_id AS userId FROM public.events WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async create(event: Omit<Event, "_id">): Promise<Event> {
    const result = await this.pool.query(
      `INSERT INTO public.events (name, datetime, location, description, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id AS _id, name, datetime AS dateTime, location, description, user_id AS userId`,
      [event.name, event.dateTime, event.location, event.description, event.userId]
    );
    return result.rows[0];
  }
}
