import { Tweet } from "../../models/tweet.js";
import { showUserInfo } from "../User/showUserInfo.js";

export const addNewTweet = async (userId, text, media) => {
  const newTweet = await Tweet.create({
    userId: userId,
    text: text,
    media: media,
  });
  if (!newTweet) throw new Error("Could not post the tweet");
  const userData = await showUserInfo(userId);
  // const tweet = await Tweet.findById(newTweet._id);
  // console.log(tweet);
  // console.log(newTweet._id);

  return { newTweet, userData };
};
