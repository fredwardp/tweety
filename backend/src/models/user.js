import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    pwHash: { type: String, required: true, trim: true },
    pwSalt: { type: String, required: true, trim: true },
    isEmailVerified: { type: Boolean, default: false },
    sixDigitCode: { type: String, required: true },
    userName: { type: String, required: true, trim: true },
    bio: { type: String, trim: true, default: "I'm new on tweety" },
    profilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXkUYyT0CvTW1zSxlUcnBuZlzQOSw8fmPWIzAEIR_fYA&s",
    },
    followed: [
      {
        userId: { type: mongoose.Types.ObjectId, required: true },
        userName: { type: String, trim: true, required: true },
      },
    ],
  },
  { collection: "users", timestamps: true }
);

export const User = mongoose.model("User", userSchema);
