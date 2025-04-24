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
      "SELECT id, event_id, user_id, status, qr_code, is_checked_in, check_in_time FROM public.invitation WHERE status = $1 AND event_id = $2;",
      ["accepted", eventID]
    ).then((result) => result.rows || null);
  }

  async findById(id: string): Promise<Invite | null> {
    return queryWithLogging(
      this.pool,
      "SELECT id, event_id, user_id, status, qr_code, is_checked_in, check_in_time FROM public.invitation WHERE id = $1",
      [id]
    ).then((result) => result.rows[0] || null);
  }
  async findinvitebyuserID(
    userID: any
  ): Promise<Invite[] | null> {
    return queryWithLogging(
      this.pool,
      "SELECT id, event_id, user_id, status, qr_code, is_checked_in, check_in_time FROM public.invitation WHERE user_id = $1",
      [userID]
    ).then((result) => result.rows || null);
  }

  async create(invite: Omit<Invite, "id">): Promise<Invite> {
    const client = await this.pool.connect();
    try {
      const insertRes = await client.query(
        `INSERT INTO public.invitation (event_id, user_id, status, qr_code, is_checked_in, check_in_time) VALUES ($1, $2, $3, $4, $5,$6) RETURNING id, event_id, user_id, status, qr_code, is_checked_in, check_in_time`,
        [invite.event_id, invite.user_id, invite.status, invite.qr_code,invite.is_checked_in, invite.check_in_time]
      );
      return insertRes.rows[0];
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }
  
  async updateInvitestatus(id: string, status:string): Promise<Invite | null> {
    // const { status } = invite; // Extract the status field from the invite object
  
    if (!status) {
      throw new Error("Only the 'status' field can be updated using this method.");
    }
  
    return queryWithLogging(
      this.pool,
      "UPDATE public.invitation SET status = $1 WHERE id = $2 RETURNING id, event_id, user_id, status, qr_code, is_checked_in, check_in_time",
      [status, id]
    ).then((result) => result.rows[0] || null);
  }

  async getAllInvites(): Promise<Invite[] | null> {
    return queryWithLogging(
      this.pool,
      "SELECT id, event_id, user_id, status, qr_code, is_checked_in, check_in_time FROM public.invitation"
    ).then((result) => result.rows || null);
  }
}