import { useContext, useState } from "react";
import "./EditTweet.css";
import { backendUrl } from "../../api/api";
import {
  ReloadContext,
  TokenDataContext,
  UserDataContext,
} from "../../context/Context";
const EditTweet = ({ tweetInfo }) => {
  const [editPopUp, setEditPopUp] = useState(true);
  const { token } = useContext(TokenDataContext);
  const { reload, setReload } = useContext(ReloadContext);
  const { user, setUser } = useContext(UserDataContext);

  const deleteTweetHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backendUrl}/tweets/${tweetInfo._id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    setUser(data.result.userData);

    // if (!data.result)
    //   return setErrorMessage(data.message || "Failed to delete tweet");

    setReload((reload) => !reload);
  };
  return (
    <>
      <button
        onClick={() => setEditPopUp((editPopUp) => !editPopUp)}
        className="edit-tweet"
      >
        <img src="/dots.svg" alt="" />
      </button>
      {!editPopUp && (
        <div className="edit-tweet-popup">
          <button
            onClick={() => setEditPopUp((editPopUp) => !editPopUp)}
            className="close-popup"
          >
            <img src="/highlight_off_24px.svg" alt="" />
          </button>
          <button onClick={deleteTweetHandler}>
            <img src="/delete_forever_24px.svg" alt="" />
            delete Tweet
          </button>
          <button>
            <img src="/settings_24px.svg" alt="" />
            edit Tweet
          </button>
        </div>
      )}
    </>
  );
};

export default EditTweet;
