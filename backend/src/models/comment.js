import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    tweetId: { type: mongoose.Types.ObjectId, ref: "Tweet", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
