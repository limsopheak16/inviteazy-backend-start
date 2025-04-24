export interface Invite {
    id?: string;
    event_id: string;
    user_id: string;
    status: "pending" | "accepted" | "rejected";
    qr_code: string;
    is_checked_in: boolean;
    check_in_time: Date | null;
  }

  export interface InviteRepository {
    findAllAcceptByenventID(id: string): Promise<Invite[] | null>;
    create(invite: Omit<Invite, "id">): Promise<Invite>;
    findinvitebyuserID(userID: any): Promise<Invite[] | null>;
    getAllInvites(): Promise<Invite[] | null>;
    updateInvitestatus(id: string, status: string): Promise<Invite | null>;
  }

    export interface InviteService {
        getAllAcceptByenventID(id: string): Promise<Invite[] | null>;
        createInvite(invite: Omit<Invite, "id">): Promise<Invite>;
        findinvitebyuserID(userID: any): Promise<Invite[] | null>;
        getAllInvites(): Promise<Invite[] | null>;
        updateInvitestatus(id: string, status: string): Promise<Invite | null>;
    }