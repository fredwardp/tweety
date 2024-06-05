import { useContext, useState } from "react";
import "./PostTweet.css";
import { backendUrl } from "../../api/api";
import { ReloadContext, UserDataContext } from "../../context/Context";

const PostTweet = ({ token }) => {
  const [errorMessage, setErrorMessage] = useState();
  const { reload, setReload } = useContext(ReloadContext);
  const { user, setUser } = useContext(UserDataContext);
  const [newTweet, setNewTweet] = useState({
    userId: user._id,
    media: null,
    text: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64 = reader.result;
      setNewTweet({ ...newTweet, media: base64 });
    };
  };

  const postNewTweetHandler = async (e) => {
    e.preventDefault();
    if (!newTweet.text) return setErrorMessage("Please write a tweet first.");

    try {
      const res = await fetch(`${backendUrl}/tweets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newTweet }),
      });

      const data = await res.json();

      if (!data.result) {
        return setErrorMessage(data.message || "Failed to write tweet");
      }

      setUser(data.result.userData);
      setReload((reload) => !reload);
      setNewTweet({
        userId: user._id,
        media: null,
        text: "",
      });
    } catch (error) {
      console.error("Error posting tweet:", error);
      setErrorMessage("Failed to write tweet");
    }
  };

  const closeImgUploadHandler = (e) => {
    e.preventDefault();
    setNewTweet({ ...newTweet, media: null });
  };

  return (
    <article className="post-tweet">
      <img
        className="profile-picture profile-picture-border"
        src={user.profilePicture}
        alt=""
      />
      <form action="">
        <img className="style-corner" src="/stxle-corner.svg" alt="" />
        <div>
          <input
            type="text"
            placeholder="What's happening?"
            value={newTweet.text}
            onChange={(e) => setNewTweet({ ...newTweet, text: e.target.value })}
          />
          {newTweet.media && (
            <button
              onClick={closeImgUploadHandler}
              className="close-img-upload"
            >
              <img src="/highlight_off_24px.svg" alt="" />
            </button>
          )}

          {newTweet.media && <img src={newTweet.media} alt="Uploaded" />}
          <div className="tweet-options">
            <label style={{ cursor: "pointer" }} htmlFor="media">
              <img src="/photo_purple_24px.svg" alt="" />
            </label>
            <input
              type="file"
              id="media"
              accept=".jpg, .png, .jpeg"
              // value={newTweet.media}
              onChange={handleImageChange}
            />

            <button className="btn tweet-btn" onClick={postNewTweetHandler}>
              Tweet
            </button>
          </div>
        </div>
      </form>
    </article>
  );
};

export default PostTweet;
