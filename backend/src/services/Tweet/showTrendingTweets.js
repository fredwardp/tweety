import { Comment } from "../../models/comment.js";
import { Followment } from "../../models/followment.js";
import { Tweet } from "../../models/tweet.js";

export async function showTrendingTweets(userId) {
  const followmentsOfUser = await Followment.find({
    userId: userId,
  });

  const followedIds = followmentsOfUser.map((doc) =>
    doc.toObject().followedId.toString()
  );

  const recentTweets = await Tweet.find({
    // createdAt: { $gte: Date.now() - 7 * 24 * 60 * 60 * 1000 },
    userId: { $nin: [...followedIds, userId] },
  }).populate({
    path: "userId",
    select: "_id firstName lastName profilePicture userName",
  });

  const commentsCount = await Promise.all(
    recentTweets.map((tweet) => countCommentsOfTweet(tweet))
  );

  const trendingTweets = recentTweets
    .map((tweet, tweetIndex) => ({
      ...tweet.toObject(),
      score: commentsCount[tweetIndex] / getLifeSpanInHours(tweet.createdAt),
    }))
    .sort((t1, t2) => t2.score - t1.score)
    .slice(0, 30);

  const tweetIds = trendingTweets.map((doc) => {
    return doc._id;
  });

  const comments = await Comment.find({ tweetId: { $in: tweetIds } })
    .populate({
      path: "userId",
      select: "_id userName profilePicture",
    })
    .sort({ createdAt: -1 });

  const tweetsWithComments = trendingTweets.map((tweet) => ({
    ...tweet,
    comments: comments.filter(
      (comment) => comment.tweetId.toString() === tweet._id.toString()
    ),
  }));

  // console.log("-------", tweetsWithComments);

  return tweetsWithComments;
}

function getLifeSpanInHours(createdAt) {
  const ageMs = Date.now() - new Date(createdAt).getTime();
  return ageMs / 1000 / 60 / 60;
}

async function countCommentsOfTweet(tweet) {
  return Comment.find({ tweetId: tweet._id }, { _id: 1 }).countDocuments();
}
