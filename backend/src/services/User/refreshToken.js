import { User } from "../../models/user.js";
import { createToken } from "../../utils/createToken.js";
import { userView } from "../helpers.js";
import { showUserInfo } from "./showUserInfo.js";

export const refreshToken = async (userId) => {
  const user = await showUserInfo(userId);
  const newAccessToken = createToken(user, "access");

  return { newAccessToken, user };
};
