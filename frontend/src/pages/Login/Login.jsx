import "./Login.css";
import { useContext, useState, useEffect } from "react";
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

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID  token: " + response.credential);
  };

  // Google login einbinden
  useEffect(() => {
    // Function to load the Google Identity Services script
    const loadScript = (src, onLoad) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = onLoad;
      document.body.appendChild(script);
    };

    // Load the Google Identity Services script
    loadScript("https://accounts.google.com/gsi/client", () => {
      /* global google */
      google.accounts.id.initialize({
        client_id:
          "336893637605-ne95s6v05c9kmnj8bjuqvigso2mua9pt.apps.googleusercontent.com",
        callback: handleCallbackResponse, // Pass the function reference
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });
    });
  }, []);

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
    console.log(data.result.tokens);
    setToken(data.result.tokens.accessToken);

    navigate("/");

    // save token --> "logged in"
  };
  return (
    <main className="notLoggedInSec">
      <article className="log_reg_wrapper">
        <h1>
          <span>Login</span> to find out what{`@apos`}s going on in the world
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
        <div id="signInDiv"></div>
      </article>
    </main>
  );
};

export default Login;
