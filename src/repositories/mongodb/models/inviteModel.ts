import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// TypeScript Interface with snake_case fields
export interface Invite extends Document {
  _id: string;
  event_id: string;
  user_id: string;
  status: "pending" | "accepted" | "declined";
  qr_code?: string;
  is_checked_in?: boolean;
  check_in_time?: Date | null;
  contribution?: any | null;
}

// Mongoose Schema using snake_case fields
const inviteSchema: Schema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    event_id: { type: String, required: true, ref: "Event" },
    user_id: { type: String, required: true, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    qr_code: { type: String },
    is_checked_in: { type: Boolean, default: false },
    check_in_time: { type: Date, default: null },
  },
  { timestamps: true }
);

// Mongoose Model
export const InviteModel = mongoose.model<Invite>("Invite", inviteSchema);
