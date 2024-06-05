import { Followment } from "../../models/followment.js";
import { User } from "../../models/user.js";
import { showUserInfo } from "../User/showUserInfo.js";
import { showUserToFollow } from "../User/showUserToFollow.js";

export async function postFollowment(userId, followedId) {
  if (userId.toString() === followedId.toString())
    throw new Error("Can't follow yourself");
  const user = await User.findById(userId);
  if (!user) throw new Error("User with id " + userId + " not found");

  const foundUserFollowedId = await User.findById(followedId);
  if (!foundUserFollowedId) throw new Error("user with this id doesn´t exists");

  const alreadyFollowed = await Followment.find({
    userId: userId,
    followedId: followedId,
  });

  if (alreadyFollowed.length >= 1) throw new Error("Can't follow a user twice");

  await Followment.create({
    userId: userId,
    followedId,
  });

  const userToFollow = await showUserToFollow(userId);
  const userData = await showUserInfo(userId);
  return { userToFollow, userData };
}
