import { deleteUser } from "./User/deleteUser.js";
import { loginUser } from "./User/loginUser.js";
import { registerUser } from "./User/registerUser.js";
import { showAllUserInfos } from "./User/showAllUserInfos.js";
import { showUserInfo } from "./User/showUserInfo.js";
import { updateUserInfo } from "./User/updateUserInfo.js";
import { verifyUserEmail } from "./User/verifyUserEmail.js";
import { refreshToken } from "./User/refreshToken.js";
import { showAllTweets } from "./Tweet/showAllTweets.js";
import { addNewTweet } from "./Tweet/addNewTweet.js";
import { updateTweet } from "./Tweet/updateTweet.js";
import { deleteTweet } from "./Tweet/deleteTweet.js";
import { showAllComments } from "./Comments/ShowAllComments.js";
import { addNewComment } from "./Comments/addNewComment.js";
import { updateComment } from "./Comments/updateComment.js";
import { deleteComment } from "./Comments/deleteComment.js";

export const UserServices = { loginUser, registerUser, showAllUserInfos, showUserInfo, updateUserInfo, verifyUserEmail, deleteUser, refreshToken };

export const TweetServices = {
    showAllTweets,
    addNewTweet,
    updateTweet,
    deleteTweet,
};
export const CommentServices = {
    showAllComments,
    addNewComment,
    updateComment,
    deleteComment,
};
