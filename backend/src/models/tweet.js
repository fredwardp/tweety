import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true },
    media: { type: String },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
