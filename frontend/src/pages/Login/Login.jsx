import "./Login.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext, TokenDataContext } from "../../context/Context";
import { backendUrl } from "../../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const { token, setToken } = useContext(TokenDataContext);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/user/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (!data.result)
      return setErrorMessage(data.message || "Failed verify email");

    setUser(data.result.userData);
    console.log(data.result.userData);
    setToken(data.result.tokens.accessToken);

    navigate("/");

    // save token --> "logged in"
  };
  return (
    <main className="notLoggedInSec">
      <article className="log_reg_wrapper">
        <h1>
          <span>Login</span> to find out what's going on in the world
        </h1>
        <form>
          <p style={{ color: "red" }}>{errorMessage}</p>

          <input
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btn_wrapper">
            <button className="btn" onClick={loginHandler}>
              Login
            </button>
            <Link className="btn btn_dark" to="/register">
              or register
            </Link>
          </div>
        </form>

        <p>
          Forgot your password?{" "}
          <Link style={{ textDecoration: "underline " }} to="/register">
            Click here
          </Link>
        </p>
      </article>
    </main>
  );
};

export default Login;
