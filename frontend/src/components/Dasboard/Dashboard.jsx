import "./Dashboard.css";
import { useContext, useEffect, useState } from "react";
import { TokenDataContext, ReloadContext } from "../../context/Context";
import PostTweet from "../PostTweet/PostTweet";
import { backendUrl } from "../../api/api";
import Tweet from "../Tweet/Tweet";

const Dashboard = () => {
  const { token } = useContext(TokenDataContext);
  const [setErrorMessage] = useState();
  const [feed, setFeed] = useState([]);
  const { reload } = useContext(ReloadContext);

  useEffect(() => {
    const getFeedHandler = async () => {
      try {
        const res = await fetch(`${backendUrl}/tweets/feed`, {
          headers: { authorization: `Bearer ${token}` },
          credentials: "include",
        });

        const data = await res.json();

        // console.log(data);

        if (!data.result) {
          setErrorMessage(data.message || "Could not load feed tweets");
          return;
        }
        setFeed(data.result.tweets);
      } catch (error) {
        console.log("An error occurred while fetching feed tweets");
      }
    };
    getFeedHandler();
  }, [reload]);

  return (
    <section className="dashboard-section">
      <PostTweet token={token} />
      {feed.map((tweet) => (
        <Tweet key={tweet._id} tweetInfo={tweet} />
      ))}
    </section>
  );
};

export default Dashboard;
