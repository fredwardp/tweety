import { Comment } from "../../models/comment.js";

export const showAllComments = async (tweetId) => {
    const allComments = await Comment.find(tweetId);
    return allComments;
};
