import asyncHandler from "express-async-handler";
import { UserServices } from "./../services/index.js";
import { sendResponse, getUserId } from "../services/helpers.js";

const getUserInfosCtrl = asyncHandler(async (req, res) => {
    const userId = getUserId(req);
    const result = await UserServices.showUserInfo(userId);
    sendResponse(res, result);
});

const getAllUserInfosCtrl = asyncHandler(async (_, res) => {
    const result = await UserServices.showAllUserInfos();
    sendResponse(res, result);
});

const postRegisterUserCtrl = asyncHandler(async (req, res) => {
    const newUserInfos = req.body;
    const result = await UserServices.registerUser(newUserInfos);
    sendResponse(res, result);
});

const postLoginUserCtrl = asyncHandler(async (req, res) => {
    const newUserInfos = req.body;
    const result = await UserServices.loginUser(newUserInfos);
    sendResponse(res, result);
});

const patchUserInfoCtrl = asyncHandler(async (req, res) => {
    const userId = getUserId(req);
    const updateInfo = req.body;
    const result = await UserServices.updateUserInfo(userId, updateInfo);
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

export const userController = {
    getUserInfosCtrl,
    getAllUserInfosCtrl,
    postRegisterUserCtrl,
    postLoginUserCtrl,
    patchUserInfoCtrl,
    deleteUserInfoCtrl,
    verifyEmailCtrl,
    postRefreshTokenCtrl,
};
