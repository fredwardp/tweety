import "./TrendsAside.css";
const TrendsAside = () => {
  return (
    <aside className="trends-aside">
      <article className="trends-aside-wrapper">
        <div className="trends-heading-wrapper">
          <h2>Trends for you</h2>
        </div>
        <div className="trending">
          <h3>Trending in Germany</h3>
          <div className="trend-wrapper">
            <h4>Münster</h4>
            <p>2.196 Tweets</p>
          </div>
          <div className="trend-wrapper">
            <h4>Dortmund</h4>
            <p>11K Tweets</p>
          </div>
        </div>
        <div className="trending">
          <h3>May interest you</h3>
          <div className="trend-wrapper">
            <h4>Webdevelopment</h4>
            <p>34K Tweets</p>
          </div>
          <div className="trend-wrapper">
            <h4>Fullstack Entwickler</h4>
            <p>9.269 Tweets</p>
          </div>
          <div className="trend-wrapper">
            <h4>Supercode bootcamp</h4>
            <p>12K Tweets</p>
          </div>
        </div>
        <div className="trending">
          <h3>What your friends follow</h3>
          <div className="trend-wrapper">
            <h4>Frederick Pawelzik </h4>
            <p>1.2M Tweets</p>
          </div>
        </div>
      </article>
    </aside>
  );
};

export default TrendsAside;
