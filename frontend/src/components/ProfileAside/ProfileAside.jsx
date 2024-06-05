import "./ProfileAside.css";
import ProfileInfos from "./ProfileInfos";
import WhoToFollow from "./WhoToFollow";
import { useContext } from "react";
import { UserDataContext, TokenDataContext } from "../../context/Context";

const ProfileAside = () => {
  const { user, setUser } = useContext(UserDataContext);
  const { token, setToken } = useContext(TokenDataContext);
  return (
    <aside className="profile-aside">
      <div className="aside-sticky-wrapper">
        <ProfileInfos user={user} />
        <WhoToFollow user={user} setUser={setUser} token={token} />
      </div>
    </aside>
  );
};

export default ProfileAside;
