import { useContext, useEffect, useState } from "react";
import "./FollowmentPopUp.css";
import { backendUrl } from "../../api/api";
import { TokenDataContext } from "../../context/Context";
import { Link } from "react-router-dom";
const FollowmentPopUp = ({ showData, followmentData, setPopUpToggle }) => {
  const { token } = useContext(TokenDataContext);

  console.log(followmentData);
  return (
    <article className="followment-wrapper">
      <button
        onClick={() => setPopUpToggle((popUpToggle) => !popUpToggle)}
        className="close-followment-popup"
      >
        <img src="/highlight_off_24px.svg" alt="" />
      </button>
      <h2>{showData}</h2>
      {followmentData?.map((user) =>
        showData === "Following" ? (
          <div key={user._id}>
            <Link
              to={
                window.location.href.includes("reload")
                  ? `/profile/${user.followedId._id}`
                  : `/profile/reload/${user._id}`
              }
            >
              <img
                className="profile-picture followment-picture"
                src={user.followedId.profilePicture}
                alt=""
              />
              <p>@{user.followedId.userName}</p>
            </Link>
            {showData === "Following" && (
              <button className="unfollow-btn">
                <img src="/delete_24px.svg" alt="" />
              </button>
            )}
          </div>
        ) : (
          <div key={user.userId._id}>
            <Link
              to={
                window.location.href.includes("reload")
                  ? `/profile/${user.userId._id}`
                  : `/profile/reload/${user.userId._id}`
              }
            >
              <img
                className="profile-picture followment-picture"
                src={user.userId.profilePicture}
                alt=""
              />
              <p>@{user.userId.userName}</p>
            </Link>
            {showData === "Following" && (
              <button className="unfollow-btn">
                <img src="/delete_24px.svg" alt="" />
              </button>
            )}
          </div>
        )
      )}
    </article>
  );
};

export default FollowmentPopUp;
