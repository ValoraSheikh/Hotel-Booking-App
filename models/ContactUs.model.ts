import { Schema, model, models } from "mongoose";

export interface IContact {
  firstName: string;
  lastName: string;
  phone: string;
  message: string;
  createdAt?: Date;
}

const contactSchema = new Schema<IContact>(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Contact = models?.Contact || model<IContact>("Contact", contactSchema);
export default Contact;
