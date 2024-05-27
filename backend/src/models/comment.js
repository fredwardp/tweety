import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    tweetId: { type: mongoose.Types.ObjectId, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    userName: { type: String, required: true },
    profilePicture: {
      type: String,
      default: "./data/images/default_profile_picture-removebg-preview.png",
    },
    content: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
