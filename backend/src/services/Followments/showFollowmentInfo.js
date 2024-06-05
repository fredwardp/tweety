import { Followment } from "../../models/followment.js";

export const showFollowmentInfo = async (userId) => {
  const followingInfo = await Followment.find({ userId: userId }).populate({
    path: "followedId",
    select: "_id userName profilePicture",
  });

  const followerInfo = await Followment.find({ followedId: userId }).populate({
    path: "userId",
    select: "_id userName profilePicture",
  });

  return { Following: followingInfo, Followers: followerInfo };
};
