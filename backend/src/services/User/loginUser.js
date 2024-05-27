import { User } from "../../models/user.js";
import { createToken } from "../../utils/createToken.js";
import { hash } from "../../utils/hash.js";

export const loginUser = async (userInfos) => {
  const user = await User.findOne({ email: userInfos.email });
  if (!user) throw new Error("Invalid login");

  const passwordHash = hash(`${userInfos.password}${user.pwSalt}`);
  if (passwordHash !== user.pwHash) throw new Error("Invalid login");

  const accessToken = createToken(user, "access");

  return { token: accessToken };
};
