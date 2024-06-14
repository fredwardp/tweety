import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import {
  AllUserDataContext,
  TokenDataContext,
  UserDataContext,
} from "../../context/Context";
import { backendUrl } from "../../api/api";
import SearchBar from "../SearchBar/SearchBar";

const Nav = () => {
  const { allUser, setAllUser } = useContext(AllUserDataContext);
  const { token, setToken } = useContext(TokenDataContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    const getAllUserDataHandler = async () => {
      try {
        const res = await fetch(`${backendUrl}/user`, {
          headers: { authorization: `Bearer ${token}` },
          credentials: "include",
        });

        const data = await res.json();

        // console.log(data);

        // if (!data.result) {
        //   setErrorMessage(data.message || "Could not load allUserData");
        //   return;
        // }

        setAllUser(data.result);
      } catch (error) {
        console.log("An error occurred while fetching all user data");
      }
    };
    getAllUserDataHandler();
  }, []);

  const navigate = useNavigate();

  const logoutUserHandler = async () => {
    try {
      const res = await fetch(`${backendUrl}/user/logout`, {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setToken(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav>
      <div className="container nav-container">
        <div style={{ width: "18%" }}>
          <Link to="/" className="logo-wrapper">
            <img className="logo" src="/tweetyLogo.svg" alt="" />
            <img src="/home.svg" alt="" />
            <p className="logo-text">Home</p>
          </Link>
        </div>
        <div className="nav-links-wrapper">
          <Link to="/explore">
            <img className="link-img" src="/visibility_24px.svg" alt="" />
            Explore
          </Link>
          <Link>
            {" "}
            <img className="link-img" src="/message_24px.svg" alt="" />
            Messages
          </Link>
          <Link
            to={
              window.location.href.includes("reload")
                ? `/profile/${user._id}`
                : `/profile/reload/${user._id}`
            }
          >
            <img className="link-img" src="/perm_identity_24px.svg" alt="" />
            Profile
          </Link>
          <Link onClick={logoutUserHandler}>
            <img className="link-img" src="/logout.svg" alt="" />
            Logout
          </Link>
        </div>
        <SearchBar allUser={allUser} />
      </div>
    </nav>
  );
};

export default Nav;
