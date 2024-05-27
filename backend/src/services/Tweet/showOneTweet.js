import { Tweet } from "../../models/tweet.js";
import { Comment } from "./../../models/comment.js";

export const showOneTweet = async (tweetId) => {
  const tweet = await Tweet.findById(tweetId);

  const comments = await Comment.find({ tweetId: tweetId });
  let commentNumber = "";
  if (comments.length !== 0) {
    commentNumber = comments.length;
  } else {
    commentNumber = 0;
  }

  return { ...tweet.toObject(), comments: commentNumber };
};
