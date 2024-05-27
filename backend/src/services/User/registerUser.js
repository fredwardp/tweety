import { User } from "../../models/user.js";
import { generateRandomSalt, hash } from "../../utils/hash.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { userView } from "../helpers.js";
import { generateRandomSixDigitCode } from "./../../utils/sixDigitCode.js";

export const registerUser = async ({
  firstName,
  lastName,
  email,
  userName,
  password,
}) => {
  const userExists = await User.findOne({ email: email });
  if (userExists) throw new Error("User with this email already exists");

  const userNameExists = await User.findOne({ userName: userName });
  if (userNameExists) throw new Error("User with this username already exists");

  const passwordSalt = generateRandomSalt();
  const passwordHash = hash(`${password}${passwordSalt}`);

  const sixDigitCode = generateRandomSixDigitCode();

  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    userName: userName,
    pwHash: passwordHash,
    pwSalt: passwordSalt,
    sixDigitCode: sixDigitCode,
  });

  await sendEmailVerification(user);
  return userView(user);
};

export const sendEmailVerification = async (user) => {
  return sendEmail({
    to: user.email,
    subject: "welcome to tweety",
    text: `You have been registered to tweety. With the following six digit code, you can verify your email in your profile settings: ${user.sixDigitCode}
        best regards,
        your tweety agent.`,
  });
};
