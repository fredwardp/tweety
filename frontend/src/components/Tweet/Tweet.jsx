import { useContext, useState } from "react";
import EditTweet from "../EditTweet/EditTweet";
import "./Tweet.css";
import { Link } from "react-router-dom";
import { UserDataContext } from "../../context/Context";
import Comments from "../Comments/Comments";
import LikeButton from "../LikeButton/LikeButton";

const Tweet = ({ tweetInfo }) => {
  const { user } = useContext(UserDataContext);
  const [showComments, setShowComments] = useState(true);

  // function to calculate the age of a tweet and show it in different ways, depending on the time that passed
  const calculateTweetAge = (createdAt) => {
    const tweetDate = new Date(createdAt); // Tue May 28 2024 14:10:39 GMT+0200 (Mitteleuropäische Sommerzeit)
    const tweetTimeAsTimestamp = Date.parse(tweetDate); // 1716898239000
    const tweetAge = Date.now() - tweetTimeAsTimestamp; // 620037
    const tweetAgeInMin = Math.floor(tweetAge / 1000 / 60); // 10
    const tweetAgeInHours = Math.floor(tweetAgeInMin / 60); // 0
    const showTweetAge =
      tweetAgeInHours >= 1
        ? `${tweetAgeInHours} h ago`
        : tweetAgeInMin > 1
        ? `${tweetAgeInMin} min ago`
        : "just now";

    return { showTweetAge, tweetAgeInHours };
  };
  const newTweetAge = calculateTweetAge(tweetInfo?.createdAt);
  // const retweetedTweetAge = calculateTweetAge(retweetedTweet?.createdAt);

  // function to change date format of tweets
  const changeTweetDateFormat = (createdAt) => {
    const tweetDate = new Date(createdAt);
    let tweetDay = new Date(tweetDate).getDate();
    tweetDay = tweetDay < 10 ? `0${tweetDay}` : tweetDay;
    let tweetMonth = new Date(tweetDate).getMonth() + 1;
    tweetMonth = tweetMonth < 10 ? `0${tweetMonth}` : tweetMonth;
    const tweetYear = new Date(tweetDate).getFullYear();
    let tweetHours = new Date(tweetDate).getHours();
    tweetHours = tweetHours < 10 ? `0${tweetHours}` : tweetHours;
    let tweetMinutes = new Date(tweetDate).getMinutes();
    tweetMinutes = tweetMinutes < 10 ? `0${tweetMinutes}` : tweetMinutes;

    return { tweetDay, tweetMonth, tweetYear, tweetHours, tweetMinutes };
  };
  const newTweetDate = changeTweetDateFormat(tweetInfo?.createdAt);
  // const retweetedTweetDate = changeTweetDateFormat(retweetedTweet?.createdAt);
  // console.log(newTweetAge);
  // console.log(newTweetDate);

  return (
    <article className="show-tweet ">
      <img
        className="profile-picture profile-picture-border"
        src={
          tweetInfo.userId._id === user._id
            ? user.profilePicture
            : tweetInfo.userId.profilePicture
        }
        alt=""
      />
      <div className="tweet-content-wrapper">
        {tweetInfo.userId._id === user._id && (
          <EditTweet tweetInfo={tweetInfo} />
        )}

        <Link
          className="tweet-userinfos"
          to={`/profile/${tweetInfo.userId._id}`}
        >
          <h2>{`${
            tweetInfo.userId._id === user._id
              ? user.firstName
              : tweetInfo.userId.firstName
          } ${
            tweetInfo.userId._id === user._id
              ? user.lastName
              : tweetInfo.userId.lastName
          }`}</h2>
          <p className="tweet-username">
            @
            {tweetInfo.userId._id === user._id
              ? user.userName
              : tweetInfo.userId.userName}
          </p>
          <p className="tweeted-at">
            {newTweetAge.tweetAgeInHours < 12
              ? newTweetAge.showTweetAge
              : `${newTweetDate.tweetDay}.${newTweetDate.tweetMonth}.${newTweetDate.tweetYear}`}
          </p>
        </Link>
        <p className="tweet-text">{tweetInfo.text}</p>
        {tweetInfo.media && (
          <img className="tweet-img" src={tweetInfo.media} alt="Tweet Media" />
        )}
        <div className="tweet-reactions">
          <button
            onClick={() => setShowComments((showComments) => !showComments)}
            className="see-interactions-btn"
          >
            <div>
              <img src="/message_24px.svg" alt="" />{" "}
              <p>{tweetInfo.comments.length}</p>
            </div>
          </button>
          <div style={{ cursor: "pointer" }}>
            <LikeButton tweetInfo={tweetInfo} liked={tweetInfo.isLikedByUser} />
          </div>
        </div>
        {!showComments && <Comments tweetInfo={tweetInfo} user={user} />}
      </div>
    </article>
  );
};

export default Tweet;
