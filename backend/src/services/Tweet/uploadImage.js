import { Tweet } from "../../models/tweet.js";

export const uploadTweetImage = async (userId, tweetId, imgBuffer) => {
  const tweet = await Tweet.findByIdAndUpdate(
    tweetId,
    { media: imgBuffer },
    { new: true }
  );

  if (!tweet) throw new Error("Could not upload img");
  return tweet;
};
