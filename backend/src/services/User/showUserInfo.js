import { userView } from "../helpers.js";
import { User } from "./../../models/user.js";

export const showUserInfo = async (userId) => {
  const userInfos = await User.findById(userId);
  if (!userInfos) throw new Error("Could not get user information");
  return userView(userInfos);
};
