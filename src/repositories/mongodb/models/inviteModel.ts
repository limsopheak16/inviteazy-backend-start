import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface Invite extends Document {
  _id: string;
  eventId: string;
  userId: string;
  status: "pending" | "accepted" | "declined";
  qrCode?: string;
}

const inviteSchema: Schema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    eventId: { type: String, required: true, ref: "Event" },
    userId: { type: String, required: true, ref: "User" }, // if you have a User model
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    qrCode: { type: String }, // optional field
  },
  { timestamps: true }
);

export const InviteModel = mongoose.model<Invite>("Invite", inviteSchema);
