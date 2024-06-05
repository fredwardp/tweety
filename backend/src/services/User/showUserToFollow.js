import { Followment } from "../../models/followment.js";
import { User } from "../../models/user.js";

export const showUserToFollow = async (userId) => {
  const user = await User.findById(userId);

  const allUsers = await User.find({ _id: { $ne: userId } }).select(
    "userName profilePicture firstName lastName"
  );

  const alreadyFollowedUsers = await Followment.find({ userId: userId });

  const followedUserIds = new Set(
    alreadyFollowedUsers.map((user) => user.followedId.toString())
  );

  const usersNotFollowed = allUsers.filter(
    (user) => !followedUserIds.has(user._id.toString())
  );

  return usersNotFollowed;
};
