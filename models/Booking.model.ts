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
      required: true
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
  },
  { timestamps: true }
);

const Booking = models?.Booking || model<IBooking>("Booking", bookingSchema);
export default Booking;
