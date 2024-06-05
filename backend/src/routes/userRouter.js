import express from "express";
import {
  doJwtAuth,
  validateRefreshTokenInCookieSession,
} from "../middlewares/authentication.js";
import { userController } from "../controllers/userController.js";

export const userRoutes = express
  .Router()
  .get("/me/:userId", doJwtAuth, userController.getUserInfosCtrl)
  .get("/", doJwtAuth, userController.getAllUserInfosCtrl)
  .get("/tofollow", doJwtAuth, userController.getAllUserToFollow)
  .get("/followment", doJwtAuth, userController.getFollowmentInfoCtrl)
  .post("/register", userController.postRegisterUserCtrl)
  .post("/login", userController.postLoginUserCtrl)
  .post("/followment/:followedId", doJwtAuth, userController.postFollowUserCtrl)
  .post("/verifyemail", doJwtAuth, userController.verifyEmailCtrl)
  .patch("/", doJwtAuth, userController.patchUserInfoCtrl)
  .delete(
    "/followment/:followedId",
    doJwtAuth,
    userController.deleteFollowmentCtrl
  )
  .delete("/", doJwtAuth, userController.deleteUserInfoCtrl)
  .post(
    "/refresh-token",
    validateRefreshTokenInCookieSession,
    userController.postRefreshTokenCtrl
  )
  .post("/logout", doJwtAuth, userController.postLogoutUserCtrl);
