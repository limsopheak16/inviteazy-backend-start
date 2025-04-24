import { Pool } from "pg";
import { Checkin, CheckinRepository } from "../../interfaces/checkinInterface";
import { queryWithLogging } from "./utils";

export class PostgresCheckinRepository implements CheckinRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }
    async create(checkin: Omit<Checkin, "id">): Promise<Checkin> {
        return queryWithLogging(
            this.pool,
            `INSERT INTO public.checkin (event_id, invite_id) 
VALUES ($1,$2) 
RETURNING id, event_id, invite_id;`,
            [checkin.event_id, checkin.invite_id]
        ).then((result) => {
            if (result.rows.length === 0) {
                throw new Error("Checkin not created");
            }
            return result.rows[0];
        }
        );
    }
    findCheckinByInviteID(inviteID: string): Promise<Checkin | null> {
        throw new Error("Method not implemented.");
    }
    getAllCheckins(): Promise<Checkin[] | null> {
        throw new Error("Method not implemented.");
    }

  async findAllCheckinsByEventID(id: string): Promise<Checkin[] | null> {
    return queryWithLogging(
      this.pool,
      "SELECT id, event_id, invite_id FROM public.checkin WHERE event_id = $1",
      [id]
    ).then((result) => result.rows || null);
  }
}