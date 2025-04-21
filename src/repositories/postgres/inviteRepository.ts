import { Pool } from "pg";
import { Invite, InviteRepository } from "../../interfaces/Inviteinterface";
import { queryWithLogging } from "./utils";

export class PostgresInviteRepository implements InviteRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAllAcceptByenventID(eventID: string): Promise<Invite[] | null> {
    return queryWithLogging(
      this.pool,
      "SELECT id, event_id, user_id, status, qr_code FROM public.invitation WHERE status = $1 AND event_id = $2;",
      ["accepted", eventID]
    ).then((result) => result.rows || null);
  }

  async findById(id: string): Promise<Invite | null> {
    return queryWithLogging(
      this.pool,
      "SELECT id, event_id, user_id, status, qr_code FROM public.invitation WHERE id = $1",
      [id]
    ).then((result) => result.rows[0] || null);
  }
  async findinvitebyuserID(
    userID: any
  ): Promise<Invite[] | null> {
    return queryWithLogging(
      this.pool,
      "SELECT id, event_id, user_id, status, qr_code FROM public.invitation WHERE user_id = $1",
      [userID]
    ).then((result) => result.rows || null);
  }

  async create(invite: Omit<Invite, "id">): Promise<Invite> {
    const client = await this.pool.connect();
    try {
      const insertRes = await client.query(
        "INSERT INTO public.invitation (event_id, user_id, status, qr_code) VALUES ($1, $2, $3, $4) RETURNING id, event_id, user_id, status, qr_code",
        [invite.event_id, invite.user_id, invite.status, invite.qr_code]
      );
      return insertRes.rows[0];
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }
  

  async update(id: string, invite: Partial<Invite>): Promise<Invite | null> {
    const fields = [];
    const values = [];
    let index = 1;

    for (const key in invite) {
      fields.push(`${key} = $${index}`);
      values.push((invite as any)[key]);
      index++;
    }

    const query = `UPDATE public.invitation SET ${fields.join(", ")} WHERE id = $${index} RETURNING id, event_id, user_id, status, qr_code`;
    values.push(id);

    return queryWithLogging(this.pool, query, values).then((result) => result.rows[0] || null);
  }

  async delete(id: string): Promise<void> {
    return queryWithLogging(
      this.pool,
      "DELETE FROM public.invitation WHERE id = $1",
      [id]
    ).then(() => {});
  }
}