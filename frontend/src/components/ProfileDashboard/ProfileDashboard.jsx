import { useContext, useEffect, useState } from "react";
import "./ProfileDashboard.css";
import { backendUrl } from "../../api/api";
import Tweet from "../Tweet/Tweet";
import {
  ReloadContext,
  ReloadProfileContext,
  UserDataContext,
} from "../../context/Context";
import FollowmentPopUp from "../FollowmentPopUp/FollowmentPopUp";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import PropTypes from "prop-types";

const ProfileDashboard = ({ user, token, setUser }) => {
  const [setErrorMessage] = useState("");
  const [userTweets, setUserTweets] = useState([]);
  const [popUpToggle, setPopUpToggle] = useState("");
  const [followmentData, setFollowmentData] = useState([]);
  const { user: loggedInUser, setUser: setLoggedInUser } =
    useContext(UserDataContext);
  const { setReloadProfile } = useContext(ReloadProfileContext);
  const { reload } = useContext(ReloadContext);

  useEffect(() => {
    const userPostsHandler = async () => {
      if (user._id) {
        try {
          const res = await fetch(`${backendUrl}/tweets/feed/${user._id}`, {
            headers: { authorization: `Bearer ${token}` },
            credentials: "include",
          });

          const data = await res.json();

          if (!data.result) {
            setErrorMessage(data.message || "Could not load user tweets");
            return;
          }

          setUserTweets(data.result.tweets);
        } catch (error) {
          console.log("An error occurred while fetching user tweets");
        }
      }
    };
    userPostsHandler();
  }, [user, reload]);

  const followUserHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/user/followment/${user._id}`, {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      if (!data.result) {
        setErrorMessage(data.message || "Could not load user to follow");
        return;
      }
      setReloadProfile((reloadProfile) => !reloadProfile);
      setLoggedInUser(data.result.userData);
    } catch (error) {
      console.log("An error occurred while fetching user to follow");
    }
  };

  const unFollowUserHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/user/followment/${user._id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
        credentials: "include",
      });

      const data = await res.json();

      if (!data.result) {
        setErrorMessage(data.message || "Could not unfollow user");
        return;
      }
      setReloadProfile((reloadProfile) => !reloadProfile);
      setLoggedInUser(data.result.userData);
    } catch (error) {
      console.log("An error occurred while unfollowing user");
    }
  };

  useEffect(() => {
    const getFollowmentInfoHandler = async () => {
      try {
        const res = await fetch(`${backendUrl}/user/followment`, {
          headers: { authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!data.result)
          return setErrorMessage(`Could not load followment infos.`);

        setFollowmentData(data.result);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowmentInfoHandler();
  }, []);

  const followPopUpHandler = async (follow) => {
    setPopUpToggle(follow);
  };
  return user ? (
    <section className="dashboard-section">
      <article className="profile-infos">
        <div className="user-infos">
          {user._id && (
            <div className="profile-left-wrapper">
              <img
                className="profile-picture"
                style={{ width: "100px", height: "100px" }}
                src={
                  user._id === loggedInUser._id
                    ? loggedInUser.profilePicture
                    : user.profilePicture
                }
                alt=""
              />
              <div>
                <h1>{`${
                  user._id === loggedInUser._id
                    ? loggedInUser.firstName
                    : user.firstName
                } ${
                  user._id === loggedInUser._id
                    ? loggedInUser.lastName
                    : user.lastName
                }`}</h1>
                <p>
                  @
                  {user._id === loggedInUser._id
                    ? loggedInUser.userName
                    : user.userName}
                </p>
              </div>
            </div>
          )}

          {user._id && loggedInUser._id !== user._id ? (
            <div>
              <button
                onClick={
                  !user.amIFollowing ? followUserHandler : unFollowUserHandler
                }
                className="user-follow-btn"
              >
                {!user.amIFollowing ? "follow" : "unfollow"}
              </button>
              <button className="user-message-btn">message</button>
            </div>
          ) : (
            <ProfileSettings setUser={setUser} user={user} />
          )}
        </div>
        <p className="user-bio">
          {user._id === loggedInUser._id ? loggedInUser.bio : user.bio}
        </p>
        <div className="profile-stats">
          <div className="profile-tweet-counter">
            <p className="stat-description">Tweets</p>
            <p>{user.tweets}</p>
          </div>
          <div
            onClick={() =>
              user._id === loggedInUser._id && followPopUpHandler("Followers")
            }
            className={`profile-tweet-counter ${
              user._id === loggedInUser._id && "click-followment"
            }`}
          >
            <p className="stat-description">Followers</p>
            <p>{user.followers}</p>
          </div>
          <div
            onClick={() =>
              user._id === loggedInUser._id && followPopUpHandler("Following")
            }
            className={`profile-tweet-counter ${
              user._id === loggedInUser._id && "click-followment"
            }`}
          >
            <p className="stat-description">Following</p>
            <p>{user.following}</p>
          </div>
          {popUpToggle && popUpToggle === "Followers" && (
            <FollowmentPopUp
              followmentData={followmentData.Followers}
              setPopUpToggle={setPopUpToggle}
              showData="Followers"
            />
          )}
          {popUpToggle && popUpToggle === "Following" && (
            <FollowmentPopUp
              followmentData={followmentData.Following}
              setPopUpToggle={setPopUpToggle}
              showData="Following"
            />
          )}
        </div>
      </article>
      {userTweets?.map((tweet) => (
        <Tweet key={tweet._id} tweetInfo={tweet} />
      ))}
    </section>
  ) : (
    <p>loading</p>
  );
};

ProfileDashboard.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  setUser: PropTypes.func,
};

export default ProfileDashboard;
