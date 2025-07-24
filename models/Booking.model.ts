import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";

export interface IBooking {
  user: Types.ObjectId;
  phoneNo: number;
  room: Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  guests: number;
  status: "booked" | "cancelled" | "completed";
  paymentStatus: "success" | "failed" | "pending"
  merchantOrderId: number;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "cancelled", "completed"],
      default: "booked",
    },
    paymentStatus: {
      type: String,
      enum: ['success', 'failed', 'pending'],
      default: "pending"
    },
    merchantOrderId: {
      type: Number,
    }

  },
  { timestamps: true }
);

bookingSchema.index({ user: 1 });
bookingSchema.index({ room: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ checkIn: 1 }); // helpful for availability

const Booking = models?.Booking || model<IBooking>("Booking", bookingSchema);
export default Booking;
