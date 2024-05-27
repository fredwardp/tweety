import express from "express";
import { tweetController } from "../controllers/tweetController.js";
import { doJwtAuth } from "../middlewares/authentication.js";

export const tweetRoutes = express
  .Router()
  .get("/", doJwtAuth, tweetController.getAllTweetsCtrl)
  .post("/", doJwtAuth, tweetController.postTweetCtrl)
  .patch("/:tweetId", doJwtAuth, tweetController.patchTweetCtrl)
  .delete("/:tweetId", doJwtAuth, tweetController.deleteTweetCtrl);
