export interface Invite {
    id?: string;
    event_id: string;
    user_id: string;
    status: "pending" | "accepted" | "rejected";
    qr_code?: string;
    is_checked_in?: boolean;
    check_in_time?: Date | null;
    is_checked_out?: boolean;
    check_out_time?: Date | null;
    gift?: number | null;

  }

  export interface InviteRepository {
    findAllAcceptByenventID(id: string): Promise<Invite[] | null>;
    findAllcheckinByenventID(eventID: string): Promise<{ check_in_count: number } | null>;
    findAllmoneyByenventID(eventID: string): Promise<{total_gift_amount: number | null } | null>;
    create(invite: Omit<Invite, "id">): Promise<Invite>;
    findinvitebyuserID(userID: any): Promise<Invite[] | null>;
    getAllInvites(): Promise<Invite[] | null>;
    updateInvitestatus(id: string, status: string): Promise<Invite | null>;
    findById(id: string): Promise<Invite | null>;
    updateCheckinStatus(id: string): Promise<Invite | null>;
    updateCheckOutStatus(invite: Omit<Invite, 'id'>, id: string): Promise<Invite | null>;
  }

    export interface InviteService {
        findAllAcceptByenventID(id: string): Promise<Invite[] | null>;
        findAllcheckinByenventID(eventID: string): Promise<{ check_in_count: number } | null>;
        findAllmoneyByenventID(eventID: string): Promise<{total_gift_amount: number | null } | null>;
        getAllAcceptByenventID(id: string): Promise<Invite[] | null>;
        createInvite(invite: Omit<Invite, "id">): Promise<Invite>;
        findinvitebyuserID(userID: any): Promise<Invite[] | null>;
        getAllInvites(): Promise<Invite[] | null>;
        updateInvitestatus(id: string, status: string): Promise<Invite | null>;
        findById(id: string): Promise<Invite | null>;
        updateCheckinStatus(id: string): Promise<Invite | null>;
        updateCheckOutStatus(invite: Omit<Invite, "id">,id: string): Promise<Invite | null>;
    }