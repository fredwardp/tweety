import { Tweet } from "../../models/tweet.js";
import { User } from "../../models/user.js";
import { deleteTweet } from "../Tweet/deleteTweet.js";

export const deleteUser = async (userId) => {
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) throw new Error("Can not delete user");

  const userTweets = await Tweet.find({ userId: userId });

  await Promise.all(
    userTweets.map(async (tweet) => {
      return await deleteTweet(tweet._id, userId);
    })
  );

  return deletedUser;
};
