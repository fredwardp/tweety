import { Comment } from "../../models/comment.js";
import { Like } from "../../models/like.js";
import { Tweet } from "../../models/tweet.js";
import { User } from "../../models/user.js";

export const createLike = async (userId, tweetId, commentId) => {
  // const [user, tweet, comment] = Promise.all([
  //   User.findById(userId),
  //   Tweet.findById(tweetId),
  //   commentId ? Comment.findById(commentId) : "Fake Comment Placeholder",
  // ]);
  const userPromise = User.findById(userId);
  const tweetPromise = Tweet.findById(tweetId);
  const commentPromise = commentId
    ? Comment.findById(commentId)
    : Promise.resolve("Fake Comment Placeholder");

  const [user, tweet, comment] = await Promise.all([
    userPromise,
    tweetPromise,
    commentPromise,
  ]);
  if (!comment || !tweet || !user) throw new Error("Could not add like");

  const alreadyLiked = await Like.findOne({
    userId: userId,
    tweetId: tweetId,
    commentId: commentId,
  });
  if (alreadyLiked) throw new Error("Can't like something twice");

  const createdLike = Like.create({
    userId: userId,
    tweetId: tweetId,
    commentId: commentId,
  });

  return createdLike;
};
