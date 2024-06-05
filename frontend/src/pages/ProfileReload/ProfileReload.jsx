import { useParams } from "react-router-dom";
import "./Profile.css";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../api/api";
import { ReloadContext, TokenDataContext } from "../../context/Context";
import Nav from "../../components/Nav/Nav";
import ProfileAside from "../../components/ProfileAside/ProfileAside";
import TrendsAside from "../../components/TrendsAside/TrendsAside";
import ProfileDashboard from "../../components/ProfileDashboard/ProfileDashboard";

const ProfileReload = () => {
  const { id } = useParams();
  const [userId, setuserId] = useState(id);
  const { token } = useContext(TokenDataContext);
  const { reloadProfile, setReloadProfile } = useContext(ReloadContext);
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const userInfoHandler = async () => {
      try {
        const res = await fetch(`${backendUrl}/user/me/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!data.result) {
          setErrorMessage(data.message || "Could not load allUserData");
          return;
        }

        setUser(data.result);
      } catch (err) {
        console.log(err);
      }
    };
    userInfoHandler();
  }, [reloadProfile]);

  return (
    <main className="profile-main">
      <Nav></Nav>
      <section className="container dashboard-wrapper">
        <ProfileAside />
        {user && <ProfileDashboard user={user} token={token} />}

        <TrendsAside />
      </section>
    </main>
  );
};

export default ProfileReload;
