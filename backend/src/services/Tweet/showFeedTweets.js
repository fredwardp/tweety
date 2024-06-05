import { Comment } from "../../models/comment.js";
import { Followment } from "../../models/followment.js";
import { Like } from "../../models/like.js";
import { Tweet } from "../../models/tweet.js";
import { User } from "../../models/user.js";

export const showFeedTweets = async (authenticatedUserId) => {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User not found");

  const followmentsOfUser = await Followment.find({
    userId: authenticatedUserId,
  });

  const followedIds = followmentsOfUser.map((doc) => doc.toObject().followedId);

  const tweets = await Tweet.find({
    userId: { $in: [...followedIds, authenticatedUserId] },
  })
    .populate({
      path: "userId",
      select: "_id userName firstName lastName profilePicture",
    })
    .sort({ createdAt: -1 });

  const tweetIds = tweets.map((doc) => doc.toObject()._id);

  const comments = await Comment.find({ tweetId: { $in: tweetIds } })
    .populate({
      path: "userId",
      select: "_id userName profilePicture",
    })
    .sort({ createdAt: -1 });

  const commentIds = comments.map((comment) => comment._id);

  const commentLikes = (
    await Like.find({
      userId: authenticatedUserId,
      commentId: { $in: commentIds },
    })
  ).map((like) => like.commentId.toString());

  const tweetLikes = (
    await Like.find({
      userId: authenticatedUserId,
      tweetId: { $in: tweetIds },
      commentId: { $exists: false },
    })
  ).map((like) => like.tweetId.toString());

  const tweetsWithComments = tweets.map((tweet) => ({
    ...tweet.toObject(),
    isLikedByUser: tweetLikes.includes(tweet._id.toString()),
    comments: comments
      .filter((comment) => comment.tweetId.toString() === tweet._id.toString())
      .map((comment) => ({
        ...comment.toObject(),
        isLikedByUser: commentLikes.includes(comment._id.toString()),
      })),
  }));

  return { tweets: tweetsWithComments };
};
