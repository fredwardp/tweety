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
import { showFeedTweets } from "./Tweet/showFeedTweets.js";
import { showUserToFollow } from "./User/showUserToFollow.js";
import { postFollowment } from "./Followments/postFollowment.js";
import { uploadTweetImage } from "./Tweet/uploadImage.js";
import { deleteFollowment } from "./Followments/deleteFollowment.js";
import { showFollowmentInfo } from "./Followments/showFollowmentInfo.js";
import { createLike } from "./Tweet/createLike.js";
import { removeLike } from "./Tweet/removeLike.js";
import { showTrendingTweets } from "./Tweet/showTrendingTweets.js";

export const UserServices = {
  loginUser,
  registerUser,
  showAllUserInfos,
  showUserInfo,
  updateUserInfo,
  postFollowment,
  verifyUserEmail,
  deleteUser,
  refreshToken,
  showUserToFollow,
  deleteFollowment,
  showFollowmentInfo,
};

export const TweetServices = {
  showAllTweets,
  addNewTweet,
  updateTweet,
  uploadTweetImage,
  deleteTweet,
  showFeedTweets,
  createLike,
  removeLike,
  showTrendingTweets,
};
export const CommentServices = {
  showAllComments,
  addNewComment,
  updateComment,
  deleteComment,
  createLike,
  removeLike,
};
