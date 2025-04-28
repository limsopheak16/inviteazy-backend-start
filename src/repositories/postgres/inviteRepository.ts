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
      "SELECT id, event_id, user_id, status, qr_code, is_checked_in, check_in_time, create_at,is_checked_out,checked_out_time,gift FROM public.invitation WHERE status = $1 AND event_id = $2;",
      ["accepted", eventID]
    ).then((result) => result.rows || null);
  }
  async findAllcheckinByenventID(eventID: string): Promise<{ check_in_count: number } | null> {
    return queryWithLogging(
      this.pool,
      `SELECT COUNT(*) 
FROM public.invitation
WHERE event_id = $1
  AND is_checked_in = true;`,
      [eventID]
    ).then((result) => result.rows[0] || null);
  }
  async findAllmoneyByenventID(eventID: string): Promise<{total_gift_amount: number | null } | null> {
    return queryWithLogging(
      this.pool,
      `SELECT
  SUM(gift)
FROM public.invitation
WHERE event_id = $1;`,
      [eventID]
    ).then((result) => result.rows[0] || null);
  }

  async findById(id: string): Promise<Invite | null> {
    return queryWithLogging(
      this.pool,
      "SELECT id, event_id, user_id, status, qr_code, is_checked_in, check_in_time, create_at,is_checked_out,checked_out_time,gift FROM public.invitation WHERE id = $1",
      [id]
    ).then((result) => result.rows[0] || null);
  }
  async findinvitebyuserID(
    userID: any
  ): Promise<Invite[] | null> {
    return queryWithLogging(
      this.pool,
      "SELECT id, event_id, user_id, status, qr_code, is_checked_in, check_in_time, create_at,is_checked_out,checked_out_time,gift FROM public.invitation WHERE user_id = $1",
      [userID]
    ).then((result) => result.rows || null);
  }

  async create(invite: Omit<Invite, "id">): Promise<Invite> {
    const client = await this.pool.connect();
    try {
      const insertRes = await client.query(
        `INSERT INTO public.invitation (event_id, user_id, status, qr_code, is_checked_in, check_in_time,is_checked_out,checked_out_time,gift) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, event_id, user_id, status, qr_code, is_checked_in, check_in_time, create_at, is_checked_out, checked_out_time, gift`,
        [invite.event_id, invite.user_id, invite.status, invite.qr_code,invite.is_checked_in, invite.check_in_time, invite.is_checked_out, invite.check_out_time, invite.gift]
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
      "UPDATE public.invitation SET status = $1 WHERE id = $2 RETURNING id, event_id, user_id, status, qr_code, is_checked_in, check_in_time,create_at,is_checked_out, checked_out_time,gift",
      [status, id]
    ).then((result) => result.rows[0] || null);
  }

  async updateCheckinStatus(id: string): Promise<Invite | null> {
    return queryWithLogging(
      this.pool,
      "UPDATE public.invitation SET is_checked_in = true,check_in_time = NOW() WHERE id = $1 RETURNING id, event_id, user_id, status, qr_code, is_checked_in, check_in_time,create_at,is_checked_out, checked_out_time,gift",
      [id]
    ).then((result) => result.rows[0] || null);
  }
  async updateCheckOutStatus(invite: Omit<Invite,"id"> ,id: string): Promise<Invite | null> {
    return queryWithLogging(
      this.pool,
      "UPDATE public.invitation SET gift = $1, is_checked_out = true,checked_out_time = NOW() WHERE id = $2 RETURNING id, event_id, user_id, status, qr_code, is_checked_in, check_in_time,create_at,is_checked_out, checked_out_time,gift",
      [invite.gift,id]
    ).then((result) => result.rows[0] || null);
  }

  async getAllInvites(): Promise<Invite[] | null> {
    return queryWithLogging(
      this.pool,
      "SELECT id, event_id, user_id, status, qr_code, is_checked_in, check_in_time,create_at, is_checked_out,checked_out_time,gift FROM public.invitation"
    ).then((result) => result.rows || null);
  }
}