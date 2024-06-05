import { useContext, useState } from "react";
import "./Comments.css";
import { backendUrl } from "../../api/api";
import { ReloadContext, TokenDataContext } from "../../context/Context";
import EditComment from "../EditComment/EditComment";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
const Comments = ({ tweetInfo, user }) => {
  const { token } = useContext(TokenDataContext);
  const { reload, setReload } = useContext(ReloadContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [newComment, setNewComment] = useState({
    tweetId: tweetInfo._id,
    userId: user._id,
    content: "",
  });

  console.log(tweetInfo);
  const postNewCommentHandler = async (e) => {
    e.preventDefault();

    if (!newComment.content)
      return setErrorMessage("Please write a comment before you post");
    const res = await fetch(`${backendUrl}/comments/${tweetInfo._id}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    const data = await res.json();

    if (!data.result)
      return setErrorMessage(data.message || "Failed to write tweet");

    setErrorMessage("");
    setReload((reload) => !reload);
    setNewComment({
      userId: user._id,
      tweetId: tweetInfo._id,
      content: "",
    });
  };
  return (
    <section className="comment-section">
      <article className="write-comment">
        <img
          className="profile-picture profile-picture-border comment-profile-picture"
          src={user.profilePicture}
          alt=""
        />
        <form action="">
          <img className="style-corner" src="/stxle-corner.svg" alt="" />
          <div>
            <input
              className="comment-input"
              type="text"
              placeholder="Write a comment"
              value={newComment.content}
              onChange={(e) =>
                setNewComment({ ...newComment, content: e.target.value })
              }
            />
            <button className="btn tweet-btn" onClick={postNewCommentHandler}>
              Comment
            </button>
          </div>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </article>
      {tweetInfo.comments.map((comment) => (
        <article className="comment-wrapper" key={comment._id}>
          {comment.userId._id === user._id && <EditComment comment={comment} />}
          <div>
            <img
              className="profile-picture profile-picture-border "
              src={comment.userId.profilePicture}
              alt=""
            />
            <Link
              to={
                window.location.href.includes("reload")
                  ? `/profile/${comment.userId._id}`
                  : `/profile/reload/${comment.userId._id}`
              }
            >
              {" "}
              <h3>@{comment.userId.userName}</h3>
            </Link>
          </div>
          <p>{comment.content}</p>
          <div className="comment-like-div">
            <LikeButton tweetInfo={tweetInfo} commentId={comment._id} />
          </div>
        </article>
      ))}
    </section>
  );
};

export default Comments;
