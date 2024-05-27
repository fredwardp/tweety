import { User } from "../../models/user.js";
import { createToken } from "../../utils/createToken.js";

export const refreshToken = async (userId) => {
    const user = await User.findById(userId);
    const newAccessToken = createToken(user, "access");
    return newAccessToken;
};
