import { Followment } from "../../models/followment.js";
import { showUserInfo } from "../User/showUserInfo.js";

export const deleteFollowment = async (userId, followedId) => {
  const deletedFollowment = await Followment.findOneAndDelete({
    userId: userId,
    followedId: followedId,
  });
  if (!deletedFollowment) throw new Error("Could not unfollow user");

  const userData = await showUserInfo(userId);

  return { deletedFollowment, userData };
};
