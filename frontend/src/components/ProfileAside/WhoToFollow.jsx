import { useContext, useEffect, useState } from "react";
import { AllUserDataContext, ReloadContext } from "../../context/Context";
import { backendUrl } from "../../api/api";
import { Link } from "react-router-dom";

const WhoToFollow = ({ user, setUser, token }) => {
  const [userToFollow, setUserToFollow] = useState([]);
  const [resultNumber, setResultNumber] = useState(4);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getUsersToFollowHandler = async () => {
      try {
        const res = await fetch(`${backendUrl}/user/tofollow`, {
          headers: { authorization: `Bearer ${token}` },
          credentials: "include",
        });

        const data = await res.json();
        // console.log(data);

        if (!data.result) {
          setErrorMessage(data.message || "Could not load user to follow");
          return;
        }

        setUserToFollow(data.result);
      } catch (error) {
        console.log("An error occurred while fetching user to follow");
      }
    };

    getUsersToFollowHandler();
  }, []);

  const followUserHandler = async (followedId) => {
    try {
      const res = await fetch(`${backendUrl}/user/followment/${followedId}`, {
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

      setUserToFollow(data.result.userToFollow);
      setUser(data.result.userData);
    } catch (error) {
      console.log("An error occurred while fetching user to follow");
    }
  };

  return (
    <article className="aside-follow-wrapper">
      <h2 className="whotofollow-h2">Who to follow</h2>
      <div className="follow-wrapper">
        {userToFollow?.slice(0, resultNumber).map((user) => (
          <div className="follow-div" key={user._id}>
            <div className="follow-left-div">
              <img
                className="profile-picture follow-picture"
                src={user.profilePicture}
                alt=""
              />

              <Link
                to={
                  window.location.href.includes("reload")
                    ? `/profile/${user._id}`
                    : `/profile/reload/${user._id}`
                }
                className="follow-name-wrapper"
              >
                <h3>{`${user.firstName} ${user.lastName}`}</h3>
                <p>@{user.userName}</p>
              </Link>
            </div>
            <button
              className="follow-btn"
              onClick={() => followUserHandler(user._id)}
            >
              <span>+</span> Follow
            </button>
          </div>
        ))}
        <button
          onClick={() => setResultNumber((resultNumber) => resultNumber + 4)}
          className="see-more"
        >
          see more
        </button>
      </div>
    </article>
  );
};

export default WhoToFollow;
