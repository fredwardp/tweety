import { Comment } from "../../models/comment.js";

export const updateComment = async (commentId, userId, commentInfo) => {
  const comment = await Comment.findById(commentId);
  if (comment.userId.toString() !== userId.toString())
    throw new Error("You do not have the rights to update comment.");

  const updateComment = await Comment.findByIdAndUpdate(
    commentId,
    commentInfo,
    { new: true }
  );
  if (!updateComment) throw new Error("Could not update comment.");
  return updateComment;
};
