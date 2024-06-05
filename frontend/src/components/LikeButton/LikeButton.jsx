import { useContext, useState } from "react";
import "./LikeButton.css";
import { TokenDataContext, UserDataContext } from "../../context/Context";
import { backendUrl } from "../../api/api";
const LikeButton = ({ tweetInfo, commentId, liked }) => {
  const { user, setUser } = useContext(UserDataContext);
  const [isLiked, setIsLiked] = useState(liked);
  const { token } = useContext(TokenDataContext);

  const addLike = async (e) => {
    e.preventDefault();

    // console.log(tweetInfo);

    const res = commentId
      ? await fetch(
          `${backendUrl}/comments/${tweetInfo._id}/like/${commentId}`,
          {
            method: "POST",
            headers: { authorization: `Bearer ${token}` },
          }
        )
      : await fetch(`${backendUrl}/tweets/${tweetInfo._id}/like`, {
          method: "POST",
          headers: { authorization: `Bearer ${token}` },
        });

    const data = await res.json();
    setIsLiked(true);

    // console.log(data);
  };

  const removeLike = async (e) => {
    e.preventDefault();

    // console.log(tweetInfo);

    const res = commentId
      ? await fetch(
          `${backendUrl}/comments/${tweetInfo._id}/like/${commentId}`,
          {
            method: "DELETE",
            headers: { authorization: `Bearer ${token}` },
          }
        )
      : await fetch(`${backendUrl}/tweets/${tweetInfo._id}/like`, {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        });

    const data = await res.json();
    setIsLiked(false);
    // console.log(data);
  };

  return (
    <div onClick={isLiked ? removeLike : addLike}>
      <img
        src={isLiked ? `/favorite_24px.svg` : `/favorite_border_24px.svg`}
        alt=""
      />
    </div>
  );
};

export default LikeButton;
