import { User } from "./../../models/user.js";

export const updateUserInfo = async (userId, updateInfo) => {
    const updatedUser = await User.findByIdAndUpdate(userId, updateInfo, { new: true });
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
};
