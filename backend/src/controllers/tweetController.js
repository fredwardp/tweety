import asyncHandler from "express-async-handler";
import { getUserId, sendResponse } from "../services/helpers.js";
import { TweetServices } from "../services/index.js";

const getAllTweetsCtrl = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const result = await TweetServices.showAllTweets(userId);
  sendResponse(res, result);
});

const postTweetCtrl = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const tweetInfos = req.body;
  const result = await TweetServices.addNewTweet(userId, tweetInfos);
  sendResponse(res, result);
});

const patchTweetCtrl = asyncHandler(async (req, res) => {
  const tweetId = req.params.tweetId;
  const userId = getUserId(req);
  const updTweetInfos = req.body;
  const result = await TweetServices.updateTweet(
    tweetId,
    userId,
    updTweetInfos
  );
  sendResponse(res, result);
});

const deleteTweetCtrl = asyncHandler(async (req, res) => {
  const tweetId = req.params.tweetId;
  const userId = getUserId(req);
  const result = await TweetServices.deleteTweet(tweetId, userId);
  sendResponse(res, result);
});

export const tweetController = {
  getAllTweetsCtrl,
  postTweetCtrl,
  patchTweetCtrl,
  deleteTweetCtrl,
};
