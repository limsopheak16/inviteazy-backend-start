import { InviteModel } from "./models/inviteModel";
import { Invite, InviteRepository } from "../../interfaces/Inviteinterface";

export class MongoInviteRepository implements InviteRepository {
  // Removed duplicate implementation of findAllAcceptByenventID
  async findinvitebyuserID(userId: string): Promise<Invite[]> {
    return await InviteModel.find({ userId });
  }  
  // Removed duplicate implementation of updateCheckOutStatus
  
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

  async findAllAcceptByenventID(eventID: string): Promise<Invite[] | null> {
    const invites = await InviteModel.find({ event_id: eventID, status: "accepted" });
    return invites.length ? invites.map(this.toInvite) : null;
  }
    async findAllcheckinByenventID(eventID: string): Promise<{ check_in_count: number } | null> {
        const checkInCount = await InviteModel.countDocuments({ event_id: eventID, is_checked_in: true });
        return checkInCount > 0 ? { check_in_count: checkInCount } : null;
    }
    async findAllmoneyByenventID(eventID: string): Promise<{  total_gift_amount: number | null } | null> {
        // const checkInCount = await InviteModel.countDocuments({ event_id: eventID, is_checked_out: true });
        const totalGiftAmount = await InviteModel.aggregate([
            { $match: { event_id: eventID, is_checked_out: true } },
            { $group: { _id: null, total: { $sum: "$gift" } } }
        ]);
        return totalGiftAmount.length > 0
            ? {  total_gift_amount: totalGiftAmount[0]?.total || null }
            : null;
    }
  async create(invite: Omit<Invite, "id">): Promise<Invite> {
    const newInvite = new InviteModel(invite);
    await newInvite.save();
    return this.toInvite(newInvite);
  }

  async findInviteByUserID(userID: string): Promise<Invite[] | null> {
    const invites = await InviteModel.find({ user_id: userID });
    if (!invites.length) return null;
    return invites.map(this.toInvite);
  }
  
  async updateCheckOutStatus(invite: Omit<Invite, "id">, id: string): Promise<Invite | null> {
    const updated = await InviteModel.findByIdAndUpdate(
      id,
      { ...invite, is_checked_out: true, check_out_time: new Date() },
      { new: true }
    );
    return updated ? this.toInvite(updated) : null;
  }
  // ✅ Helper to map Mongoose document to Invite interface
  private toInvite(doc: any): Invite {
    return {
      id: doc._id.toString(),
      event_id: doc.event_id,
      user_id: doc.user_id,
      status: doc.status,
      qr_code: doc.qr_code,
      is_checked_in: doc.is_checked_in,
      check_in_time: doc.check_in_time,
      is_checked_out: doc.is_checked_out,
      check_out_time: doc.check_out_time,
      gift: doc.gift,
    };
  }
}
