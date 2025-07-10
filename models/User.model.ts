import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  provider: "credentials" | "google";
  role: "user" | "admin";
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "credentials";
      },
      select: false,
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String, // Used by NextAuth (Google login etc)
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// userSchema.index({ email: 1 }, { unique: true }); // ensure unique + fast

userSchema.pre("save", async function (next) {
  // Only hash the password if it's modified AND exists
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

const User = models?.User || model<IUser>("User", userSchema);
export default User;
