import { User } from "../../models/user.js";

export const showAllUserInfos = async () => {
  const allUserInfos = await User.find({}).select(
    "_id userName profilePicture"
  );
  if (!allUserInfos) throw new Error("Could not load user infos");

  return allUserInfos;
};
