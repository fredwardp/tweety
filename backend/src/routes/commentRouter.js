import express from "express";
import { doJwtAuth } from "../middlewares/authentication.js";
import { commentController } from "./../controllers/commentController.js";

export const commentRoutes = express
    .Router()
    .get("/:tweetId", doJwtAuth, commentController.getAllCommentsCtrl)
    .post("/:tweetId", doJwtAuth, commentController.postCommentCtrl)
    .patch("/:commentId", doJwtAuth, commentController.patchCommentCtrl)
    .delete("/:commentId", doJwtAuth, commentController.deleteCommentCtrl);
