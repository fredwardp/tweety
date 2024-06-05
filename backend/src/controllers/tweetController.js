import asyncHandler from "express-async-handler";
import { getUserId, sendResponse } from "../services/helpers.js";
import { TweetServices } from "../services/index.js";

const getAllTweetsCtrl = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const result = await TweetServices.showAllTweets(userId);
  sendResponse(res, result);
});

const getFeedTweets = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const result = await TweetServices.showFeedTweets(userId);
  sendResponse(res, result);
});

const getTrendingTweetsCtrl = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const result = await TweetServices.showTrendingTweets(userId);
  sendResponse(res, result);
});

const postTweetCtrl = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const { text, media } = req.body.newTweet;

  const result = await TweetServices.addNewTweet(userId, text, media);
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

const postLikeForTweetCtrl = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const tweetId = req.params.tweetId;
  const result = await TweetServices.createLike(userId, tweetId);
  sendResponse(res, result);
});

const deleteLikeForTweetCtrl = asyncHandler(async (req, res) => {
  const userId = getUserId(req);
  const tweetId = req.params.tweetId;
  const result = await TweetServices.removeLike(userId, tweetId);
  sendResponse(res, result);
});

export const tweetController = {
  getAllTweetsCtrl,
  getTrendingTweetsCtrl,
  postTweetCtrl,
  patchTweetCtrl,
  deleteTweetCtrl,
  getFeedTweets,
  postLikeForTweetCtrl,
  deleteLikeForTweetCtrl,
};
