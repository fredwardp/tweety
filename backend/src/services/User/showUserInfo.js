import { Followment } from "../../models/followment.js";
import { Tweet } from "../../models/tweet.js";
import { userView } from "../helpers.js";
import { User } from "./../../models/user.js";

export const showUserInfo = async (userId, loggedInUserId) => {
  const userInfos = await User.findById(userId);

  if (!userInfos) throw new Error("Could not get user information");
  const relUserInfo = userView(userInfos);

  const tweetsFromUser = await Tweet.find({ userId: userId });
  const tweetNumber = tweetsFromUser.length;

  const followedUser = await Followment.find({ userId: userId });
  const followedUserNumber = followedUser.length;
  //
  const follower = await Followment.find({ followedId: userId });
  const followerNumber = follower.length;

  const loggedInUserFollows = await Followment.find({
    userId: loggedInUserId,
    followedId: userId,
  });

  return {
    ...relUserInfo,
    tweets: tweetNumber,
    followers: followerNumber,
    following: followedUserNumber,
    amIFollowing: loggedInUserFollows.length > 0 ? true : false,
  };
};
