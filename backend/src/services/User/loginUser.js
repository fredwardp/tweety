import { User } from "../../models/user.js";
import { createToken } from "../../utils/createToken.js";
import { hash } from "../../utils/hash.js";
import { userView } from "../helpers.js";
import { showUserInfo } from "./showUserInfo.js";

export const loginUser = async (userInfos) => {
  const user = await User.findOne({ email: userInfos.email });
  if (!user) throw new Error("Invalid login");

  const passwordHash = hash(`${userInfos.password}${user.pwSalt}`);
  if (passwordHash !== user.pwHash) throw new Error("Invalid login");

  const accessToken = createToken(user, "access");
  const refreshToken = createToken(user, "refresh");
  const userData = await showUserInfo(user._id);
  return {
    userData: userData,
    tokens: { accessToken: accessToken, refreshToken: refreshToken },
  };
};
