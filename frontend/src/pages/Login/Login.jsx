import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api";
import { UserDataContext, TokenDataContext } from "../../context/Context";

const Login = ({ setToken, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const { token, setToken } = useContext(TokenDataContext);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const res = await fetch(`${backendUrl}/users/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();

    if (!data.result)
      return setErrorMessage(data.message || "Failed verify email");

    navigate("/");

    // save token --> "logged in"

    setUser(data.result.userData);
    setToken(data.result.token);
  };
  return (
    <main>
      <h1>Login</h1>
      <form>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={loginHandler}>Login</button>
      </form>

      <p>
        Don't have an account yet? <Link to="/register">Create Account</Link>
      </p>
    </main>
  );
};

export default Login;
