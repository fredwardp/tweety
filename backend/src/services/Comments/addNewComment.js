import { Comment } from "../../models/comment.js";

export const addNewComment = async (tweetId, userId, commentInfo) => {
  const newComment = Comment.create({
    ...commentInfo,
    userId: userId,
    tweetId: tweetId,
  });
  if (!newComment) throw new Error("Could not post comment");
  return newComment;
};
