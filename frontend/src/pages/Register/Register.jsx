import "./Register";
import { Link } from "react-router-dom";
import { useState } from "react";
import { backendUrl } from "../../api/api";
import { UserDataContext, TokenDataContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

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

    const res = await fetch(`${backendUrl}/register`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: registerData,
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
    <header className="register_section">
      <article>
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
              setRegisterData({ ...registerData, lastName: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="username"
            value={registerData.userName}
            onChange={(event) =>
              setRegisterData({ ...registerData, userName: event.target.value })
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
              setRegisterData({ ...registerData, password: event.target.value })
            }
          />
          <button onClick={registerHandler}>register</button>
        </form>
        <p>Are you already registered?</p>
        <Link to="/login">Login</Link>
      </article>
    </header>
  );
};

export default Register;
