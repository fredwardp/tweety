import { User } from "./../../models/user.js";
import { showUserInfo } from "./showUserInfo.js";

export const updateUserInfo = async (userId, updateInfo) => {
  const updatedUser = await User.findByIdAndUpdate(userId, updateInfo, {
    new: true,
  });
  if (!updatedUser) throw new Error("User not found");

  const userData = await showUserInfo(userId);
  return userData;
};
