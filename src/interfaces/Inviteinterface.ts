export interface Invite {
    id?: string;
    event_id: string;
    user_id: string;
    status: "pending" | "accepted" | "rejected";
    qr_code: string;
  }

  export interface InviteRepository {
    findAllAcceptByenventID(id: string): Promise<Invite[] | null>;
    create(invite: Omit<Invite, "id">): Promise<Invite>;
    findinvitebyuserID(userID: any): Promise<Invite[] | null>;
  }

    export interface InviteService {
        getAllAcceptByenventID(id: string): Promise<Invite[] | null>;
        createInvite(invite: Omit<Invite, "id">): Promise<Invite>;
        findinvitebyuserID(userID: any): Promise<Invite[] | null>;
    }