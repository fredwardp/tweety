import { Comment } from "../../models/comment.js";
import { Tweet } from "../../models/tweet.js";
import { showUserInfo } from "../User/showUserInfo.js";

export const deleteTweet = async (tweetId, userId) => {
  const tweet = await Tweet.findById(tweetId);
  if (tweet.userId.toString() !== userId.toString())
    throw new Error("You are not allowed to delete tweet.");

  const deletedTweet = await Tweet.findByIdAndDelete(tweetId);
  if (!deletedTweet) throw new Error("Could not delete tweet");

  await Comment.deleteMany({ tweetId: tweetId });
  const userData = await showUserInfo(userId);
  return { deletedTweet, userData };
};
