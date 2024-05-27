import { Tweet } from "../../models/tweet.js";

export const addNewTweet = async (userId, tweetInfos) => {
  const newTweet = Tweet.create({ ...tweetInfos, userId: userId });
  if (!newTweet) throw new Error("Could not post the tweet");

  return newTweet;
};
