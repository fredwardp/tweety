import { User } from "../../models/user.js";

export const verifyUserEmail = async (userId, sixDigitCode) => {
    const user = await User.findById(userId);
    if (user.isEmailVerified) throw new Error("Email is already verified");
    const matchedCode = user.sixDigitCode === sixDigitCode;
    if (!matchedCode) throw new Error("Code does not match.");
    user.isEmailVerified = true;
    await user.save();
    return { message: "Email has been verified successfully." };
};
