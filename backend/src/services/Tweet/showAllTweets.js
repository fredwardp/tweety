import { Comment } from "../../models/comment.js";
import { Like } from "../../models/like.js";
import { Tweet } from "../../models/tweet.js";
import { showOneTweet } from "./showOneTweet.js";

export const showAllTweets = async (userId) => {
  const userTweets = await Tweet.find({ userId: userId })
    .populate({
      path: "userId",
      select: "_id userName firstName lastName profilePicture",
    })
    .sort({ createdAt: -1 });
  if (!userTweets) throw new Error("Could not find any Tweets");

  const tweetIds = userTweets.map((tweet) => tweet.toObject()._id);

  const comments = await Comment.find({ tweetId: { $in: tweetIds } })
    .populate({
      path: "userId",
      select: "_id userName profilePicture",
    })
    .sort({ createdAt: -1 });

  const tweetsWithComments = userTweets.map((tweet) => ({
    ...tweet.toObject(),
    comments: comments.filter(
      (comment) => comment.tweetId.toString() === tweet._id.toString()
    ),
  }));

  return { tweets: tweetsWithComments };
};
