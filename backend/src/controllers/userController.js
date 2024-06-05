import asyncHandler from "express-async-handler";
import { UserServices } from "./../services/index.js";
import { sendResponse, getUserId } from "../services/helpers.js";

const getUserInfosCtrl = asyncHandler(async (req, res) => {
  const loggedInUserId = getUserId(req);
  const userId = req.params.userId;
  const result = await UserServices.showUserInfo(userId, loggedInUserId);
  sendResponse(res, result);
});

const getAllUserInfosCtrl = asyncHandler(async (_, res) => {
  const result = await UserServices.showAllUserInfos();
  sendResponse(res, result);
});

const getAllUserToFollow = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const result = await UserServices.showUserToFollow(userId);
  sendResponse(res, result);
});

const getFollowmentInfoCtrl = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const result = await UserServices.showFollowmentInfo(userId);
  sendResponse(res, result);
});

const postRegisterUserCtrl = asyncHandler(async (req, res) => {
  const newUserInfos = req.body;
  const result = await UserServices.registerUser(newUserInfos);
  sendResponse(res, result);
});

const postLoginUserCtrl = asyncHandler(async (req, res) => {
  const userInfos = req.body;
  const result = await UserServices.loginUser(userInfos);
  if (result.tokens.refreshToken) {
    req.session.refreshToken = result.tokens.refreshToken; // refresh token in http only cookie session speichern
  }
  sendResponse(res, result);
});

const postFollowUserCtrl = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const followedId = req.params.followedId;
  const result = await UserServices.postFollowment(userId, followedId);
  sendResponse(res, result);
});

const patchUserInfoCtrl = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const updateInfo = req.body;
  const result = await UserServices.updateUserInfo(userId, updateInfo);
  sendResponse(res, result);
});

const deleteFollowmentCtrl = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const followedId = req.params.followedId;
  const result = await UserServices.deleteFollowment(userId, followedId);
  sendResponse(res, result);
});

const deleteUserInfoCtrl = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const result = await UserServices.deleteUser(userId);
  sendResponse(res, result);
});

const verifyEmailCtrl = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const sixDigitCode = req.body.sixDigitCode;
  const result = await UserServices.verifyUserEmail(userId, sixDigitCode);
  sendResponse(res, result);
});

const postRefreshTokenCtrl = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const result = await UserServices.refreshToken(userId);
  sendResponse(res, result);
});

const postLogoutUserCtrl = asyncHandler(async (req, res) => {
  req.session.refreshToken = null;
  const result = "You are now logged out";
  sendResponse(res, result);
});

export const userController = {
  getUserInfosCtrl,
  getAllUserInfosCtrl,
  getAllUserToFollow,
  postRegisterUserCtrl,
  postLoginUserCtrl,
  postFollowUserCtrl,
  patchUserInfoCtrl,
  deleteUserInfoCtrl,
  verifyEmailCtrl,
  postRefreshTokenCtrl,
  deleteFollowmentCtrl,
  getFollowmentInfoCtrl,
  postLogoutUserCtrl,
};
