import { useState } from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";

const SearchBar = ({ allUser }) => {
  const [searchInput, setSearchInput] = useState();

  return (
    <>
      <input
        placeholder="Search Tweety"
        className="search-input"
        type="search"
        name=""
        id=""
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {searchInput && (
        <article className="search-popup">
          {allUser.map(
            (user) =>
              user.userName.includes(searchInput) && (
                <Link
                  className="search-output"
                  to={
                    window.location.href.includes("reload")
                      ? `/profile/${user._id}`
                      : `/profile/reload/${user._id}`
                  }
                >
                  <img
                    src={user.profilePicture}
                    className="profile-picture"
                    alt=""
                  />{" "}
                  <p>@{user.userName}</p>
                </Link>
              )
          )}
        </article>
      )}
    </>
  );
};

export default SearchBar;
