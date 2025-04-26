import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// TypeScript Interface for Invite
export interface Invite extends Document {
  _id: string;
  event_id: string;
  user_id: string;
  status: "pending" | "accepted" | "declined";
  qr_code?: string;
  is_checked_in?: boolean;
  check_in_time?: Date | null;
  is_checked_out?: boolean;
  check_out_time?: Date | null;
  gift?: any | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose Schema
const inviteSchema: Schema<Invite> = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    event_id: { type: String, required: true, ref: "Event" },
    user_id: { type: String, required: true, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    qr_code: { type: String, default: null },
    is_checked_in: { type: Boolean, default: false },
    check_in_time: { type: Date, default: null },
    is_checked_out: { type: Boolean, default: false },
    check_out_time: { type: Date, default: null },
    gift: { type: Schema.Types.Mixed, default: null },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    versionKey: false,
  }
);

// Mongoose Model
export const InviteModel = mongoose.model<Invite>("Invite", inviteSchema);
