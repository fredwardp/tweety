import { Tweet } from "../../models/tweet.js";
import { showOneTweet } from "./showOneTweet.js";

export const showAllTweets = async (userId) => {
  const allTweets = await Tweet.find({ userId: userId });
  if (!allTweets) throw new Error("Could not find any Tweets");

  const allTweetsWithComments = await Promise.all(
    allTweets.map(async (tweet) => {
      return await showOneTweet(tweet._id);
    })
  );

  return allTweetsWithComments;
};
