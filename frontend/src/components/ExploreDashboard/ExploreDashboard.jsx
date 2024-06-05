import { useContext, useEffect, useState } from "react";
import Tweet from "../Tweet/Tweet";
import "./ExploreDashboard.css";
import { TokenDataContext } from "../../context/Context";
import { backendUrl } from "../../api/api";

const ExploreDashboard = () => {
  const [trendingTweets, setTrendingTweets] = useState([]);
  const { token } = useContext(TokenDataContext);

  useEffect(() => {
    const trendingTweetsHandler = async () => {
      try {
        console.log();
        const res = await fetch(`${backendUrl}/tweets/trending`, {
          headers: { authorization: `Bearer ${token}` },
          credentials: "include",
        });

        const data = await res.json();

        if (!data.result) {
          setErrorMessage(data.message || "Could not load feed tweets");
          return;
        }

        setTrendingTweets(data.result);
      } catch (error) {
        console.log("An error occurred while fetching feed tweets");
      }
    };
    trendingTweetsHandler();
  }, []);

  return (
    <section className="dashboard-section">
      {trendingTweets?.map((tweet) => (
        <Tweet key={tweet._id} tweetInfo={tweet} />
      ))}
    </section>
  );
};

export default ExploreDashboard;
