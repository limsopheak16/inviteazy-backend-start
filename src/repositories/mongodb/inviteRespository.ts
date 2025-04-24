import { InviteModel } from "./models/inviteModel";
import { Invite, InviteRepository } from "../../interfaces/Inviteinterface";

export class MongoInviteRepository implements InviteRepository {
  async getAllInvites(): Promise<Invite[] | null> {
    const invites = await InviteModel.find();
    if (!invites.length) return null;

    return invites.map(invite => this.toInvite(invite));
  }

  async updateInvitestatus(id: string, status: string): Promise<Invite | null> {
    const updated = await InviteModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return updated ? this.toInvite(updated) : null;
  }

  async findById(id: string): Promise<Invite | null> {
    const invite = await InviteModel.findById(id);
    return invite ? this.toInvite(invite) : null;
  }

  async updateCheckinStatus(id: string): Promise<Invite | null> {
    const updated = await InviteModel.findByIdAndUpdate(
      id,
      { is_checked_in: true, check_in_time: new Date() },
      { new: true }
    );
    return updated ? this.toInvite(updated) : null;
  }

  async findAllAcceptByenventID(eventID: string): Promise<Invite[]> {
    const invites = await InviteModel.find({ event_id: eventID, status: "accepted" });
    return invites.map(this.toInvite);
  }

  async create(invite: Omit<Invite, "id">): Promise<Invite> {
    const newInvite = new InviteModel(invite);
    await newInvite.save();
    return this.toInvite(newInvite);
  }

  async findinvitebyuserID(userID: string): Promise<Invite[] | null> {
    const invites = await InviteModel.find({ user_id: userID });
    if (!invites.length) return null;
    return invites.map(this.toInvite);
  }

  // Helper to convert Mongoose doc to domain model
  private toInvite(doc: any): Invite {
    return {
      id: doc._id.toString(),
      event_id: doc.event_id,
      user_id: doc.user_id,
      status: doc.status,
      qr_code: doc.qr_code,
      is_checked_in: doc.is_checked_in,
      check_in_time: doc.check_in_time,
    };
  }
}
