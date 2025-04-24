export interface Checkin {
  id?: string;
  event_id: string;
  invite_id: string;
}

export interface CheckinRepository {
  findAllCheckinsByEventID(id: string): Promise<Checkin[] | null>;
  create(checkin: Omit<Checkin, "id">): Promise<Checkin>;
  findCheckinByInviteID(inviteID: string): Promise<Checkin | null>;
  getAllCheckins(): Promise<Checkin[] | null>;
}
export interface CheckinService {
  findAllCheckinsByEventID(id: string): Promise<Checkin[] | null>;
  createCheckin(checkin: Omit<Checkin, "id">): Promise<Checkin>;
  findCheckinByInviteID(inviteID: string): Promise<Checkin | null>;
  getAllCheckins(): Promise<Checkin[] | null>;
}