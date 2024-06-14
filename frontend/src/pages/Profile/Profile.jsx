import { useParams } from "react-router-dom";
import "./Profile.css";
import { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../api/api";
import {ReloadProfileContext, TokenDataContext } from "../../context/Context";
import Nav from "../../components/Nav/Nav";
import ProfileAside from "../../components/ProfileAside/ProfileAside";
import TrendsAside from "../../components/TrendsAside/TrendsAside";
import ProfileDashboard from "../../components/ProfileDashboard/ProfileDashboard";

const Profile = () => {
  const { id } = useParams();
  const { token } = useContext(TokenDataContext);
  const { reloadProfile } = useContext(ReloadProfileContext);
  const [user, setUser] = useState({});
  const [setErrorMessage] = useState("");
  console.log("jallo");
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
        <ProfileDashboard user={user} setUser={setUser} token={token} />
        <TrendsAside />
      </section>
    </main>
  );
};

export default Profile;
