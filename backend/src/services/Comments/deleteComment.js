import { Comment } from "../../models/comment.js";

export const deleteComment = async (commentId, userId) => {
  const deletedComment = await Comment.findById(commentId);
  if (deletedComment.userId.toString() !== userId.toString())
    throw new Error("You are not allowed to delete comment.");

  await Comment.findByIdAndDelete(commentId);
  return deletedComment;
};
