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

  async create(invite: Omit<Invite, "id">): Promise<Invite> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
  
      // Step 1: Check the user's role
      const roleRes = await client.query(
        "SELECT role FROM public.users WHERE id = $1",
        [invite.user_id]
      );
  
      if (roleRes.rowCount === 0) {
        throw new Error("User not found");
      }
  
      const role = roleRes.rows[0].role;
  
      // Step 2: Check invitation count if role is 'user'
      if (role === 'user') {
        const countRes = await client.query(
          "SELECT COUNT(*) FROM public.invitation WHERE user_id = $1 AND event_id = $2",
          [invite.user_id, invite.event_id]
        );
  
        const count = parseInt(countRes.rows[0].count, 10);
  
        if (count >= 50) {
          throw new Error("User has reached the invitation limit (50) for this event.");
        }
      }
  
      // Step 3: Proceed with insert
      const insertRes = await client.query(
        "INSERT INTO public.invitation (event_id, user_id, status, qr_code) VALUES ($1, $2, $3, $4) RETURNING id, event_id, user_id, status, qr_code",
        [invite.event_id, invite.user_id, invite.status, invite.qr_code]
      );
  
      await client.query('COMMIT');
      return insertRes.rows[0];
    } catch (err) {
      await client.query('ROLLBACK');
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