import asyncHandler from "express-async-handler";
import { getUserId, sendResponse } from "../services/helpers.js";
import { CommentServices } from "./../services/index.js";

const getAllCommentsCtrl = asyncHandler(async (req, res) => {
  const tweetId = req.params.tweetId;
  const result = await CommentServices.showAllComments(tweetId);
  sendResponse(res, result);
});

const postCommentCtrl = asyncHandler(async (req, res) => {
  const tweetId = req.params.tweetId;
  const userId = getUserId(req);
  const commentInfo = req.body;
  const result = await CommentServices.addNewComment(
    tweetId,
    userId,
    commentInfo
  );
  sendResponse(res, result);
});

const patchCommentCtrl = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;
  const commentInfo = req.body;
  const userId = getUserId(req);
  const result = await CommentServices.updateComment(
    commentId,
    userId,
    commentInfo
  );
  sendResponse(res, result);
});

const deleteCommentCtrl = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;
  const userId = getUserId(req);
  const result = await CommentServices.deleteComment(commentId, userId);
  sendResponse(res, result);
});

export const commentController = {
  getAllCommentsCtrl,
  postCommentCtrl,
  patchCommentCtrl,
  deleteCommentCtrl,
};
