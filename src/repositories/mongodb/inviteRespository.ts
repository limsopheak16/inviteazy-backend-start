import { InviteModel } from "./models/inviteModel";
import { Invite, InviteRepository } from "../../interfaces/Inviteinterface";

export class MongoInviteRepository implements InviteRepository {

  async findAllAcceptByenventID(eventID: string): Promise<Invite[]> {
    const invites = await InviteModel.find({ event_id: eventID, status: "accepted" });
    if (!invites.length) return [];

    return invites.map(({_id, eventId, userId, status, qrCode}) => {
        return {
            id: _id.toString(),
            event_id: eventId,
            user_id: userId,
            status: status,
            qr_code: qrCode,
        } as Invite;
    });
  }

  async create(invite: Omit<Invite, "id">): Promise<Invite> {
    const newInvite = new InviteModel(invite);
    await newInvite.save();

    return {
      id: newInvite._id.toString(),
      event_id: newInvite.eventId,
      user_id: newInvite.userId,
      status: newInvite.status,
      qr_code: newInvite.qrCode,
    } as Invite;
  }

  async findinvitebyuserID(userID: string): Promise<Invite[] | null> {
    const invites = await InviteModel.find({ user_id: userID });
    if (!invites.length) return null;

    return invites.map((invite) => ({
      id: invite._id.toString(),
      event_id: invite.eventId,
      user_id: invite.userId,
      status: invite.status === "declined" ? "rejected" : invite.status,
      qr_code: invite.qrCode ?? "", // Provide a default empty string if qrCode is undefined
    }));
  }
}
