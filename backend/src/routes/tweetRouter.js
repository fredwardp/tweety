import express from "express";
import { tweetController } from "../controllers/tweetController.js";
import { doJwtAuth } from "../middlewares/authentication.js";
import multer from "multer";

// const upload = multer({ storage: multer.memoryStorage() });

export const tweetRoutes = express
  .Router()
  .get("/feed/:userId", doJwtAuth, tweetController.getAllTweetsCtrl)
  .get("/feed", doJwtAuth, tweetController.getFeedTweets)
  .get("/trending", doJwtAuth, tweetController.getTrendingTweetsCtrl)
  .post("/", doJwtAuth, tweetController.postTweetCtrl)
  .post("/:tweetId/like", doJwtAuth, tweetController.postLikeForTweetCtrl)
  .delete("/:tweetId/like", doJwtAuth, tweetController.deleteLikeForTweetCtrl)
  .patch("/:tweetId", doJwtAuth, tweetController.patchTweetCtrl)
  .delete("/:tweetId", doJwtAuth, tweetController.deleteTweetCtrl);
