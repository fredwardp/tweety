import { Like } from "../../models/like.js";

export const removeLike = async (userId, tweetId, commentId) => {
  const deleteQuery = commentId
    ? { userId: userId, tweetId, commentId }
    : { userId, tweetId, commentId: { $exists: false } };

  const removedLike = Like.findOneAndDelete(deleteQuery);

  return removedLike;
};
