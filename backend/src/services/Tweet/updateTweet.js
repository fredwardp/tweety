import { Tweet } from "../../models/tweet.js";

export const updateTweet = async (tweetId, userId, updTweetInfos) => {
  const tweet = await Tweet.findById(tweetId);
  if (tweet.userId.toString() !== userId.toString())
    throw new Error("You don't have the right to update this tweet");

  const updatedTweet = await Tweet.findByIdAndUpdate(tweetId, updTweetInfos, {
    new: true,
  });
  if (!updateTweet) throw new Error("Could not update tweet");
  return updatedTweet;
};
