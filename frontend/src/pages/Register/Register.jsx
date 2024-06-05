import "./Register";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { backendUrl } from "../../api/api";
import { UserDataContext, TokenDataContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const { token, setToken } = useContext(TokenDataContext);

  const navigate = useNavigate();

  const registerHandler = async (event) => {
    event.preventDefault();

    const res = await fetch(`${backendUrl}/user/register`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ ...registerData }),
    });

    const data = await res.json();

    if (!data.result)
      return setErrorMessage(
        data.message || "Failed to register, please try again."
      );

    setUser(data.result.userData);
    setToken(data.result.token);

    navigate("/verifyEmail");
  };
  return (
    <>
      <main className="notLoggedInSec">
        <article className="log_reg_wrapper">
          <h1>
            <span>Register</span> to find out what's going on in the world
          </h1>
          <p>{errorMessage}</p>
          <form action="">
            <input
              type="text"
              placeholder="firstname"
              value={registerData.firstName}
              onChange={(event) =>
                setRegisterData({
                  ...registerData,
                  firstName: event.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="lastname"
              value={registerData.lastName}
              onChange={(event) =>
                setRegisterData({
                  ...registerData,
                  lastName: event.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="username"
              value={registerData.userName}
              onChange={(event) =>
                setRegisterData({
                  ...registerData,
                  userName: event.target.value,
                })
              }
            />
            <input
              type="email"
              placeholder="email"
              value={registerData.email}
              onChange={(event) =>
                setRegisterData({ ...registerData, email: event.target.value })
              }
            />
            <input
              type="password"
              placeholder="password"
              value={registerData.password}
              onChange={(event) =>
                setRegisterData({
                  ...registerData,
                  password: event.target.value,
                })
              }
            />
            <div className="btn_wrapper">
              <button className="btn" onClick={registerHandler}>
                register
              </button>
              <Link className="btn btn_dark" to="/login">
                or login
              </Link>
            </div>
          </form>
          <p>With clicking on register you agree saving your user data</p>
          {/* <Link to="">Login</Link> */}
        </article>
      </main>
    </>
  );
};

export default Register;
