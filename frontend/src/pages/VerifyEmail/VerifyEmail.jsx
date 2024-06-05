import "./VerifyEmail.css";
import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserDataContext, TokenDataContext } from "../../context/Context";
import { backendUrl } from "../../api/api";

const VerifyEmail = () => {
  const [sixDigitCode, setSixDigitCode] = useState("");
  const [counter, setCounter] = useState(5);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const { token, setToken } = useContext(TokenDataContext);

  const navigate = useNavigate();

  const linkToDashboard = () => {
    navigate("/");
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  };

  const verifyEmailHandler = async (event) => {
    event.preventDefault();

    const res = await fetch(`${backendUrl}/user/verifyemail`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ sixDigitCode: sixDigitCode }),
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (!data.result)
      return setErrorMessage(data.message || "Failed verify email");

    setErrorMessage("");
    setSuccessMessage(
      `${user.firstName} you have verified your email successfully.`
    );

    setTimeout(() => linkToDashboard(), 5000);

    console.log(data);
  };

  console.log(user);

  return (
    <main className="notLoggedInSec">
      <article className="log_reg_wrapper">
        {successMessage ? (
          <>
            <p style={{ color: "green" }}>{successMessage}</p>
            <p>You will get navigated to Dashboard in {counter} seconds.</p>
          </>
        ) : (
          <>
            <h1>Hey {user.firstName}, please verify your Email</h1>
            <form>
              <p style={{ color: "red" }}>{errorMessage}</p>
              <div className="email-input">
                <label htmlFor="sixDigitCode">Enter Six Digit Code: </label>
                <input
                  id="sixDigitCode"
                  type="text"
                  value={sixDigitCode}
                  onChange={(event) => setSixDigitCode(event.target.value)}
                />
              </div>

              <button className="btn" onClick={verifyEmailHandler}>
                Verify Email
              </button>
            </form>{" "}
          </>
        )}
      </article>
    </main>
  );
};

export default VerifyEmail;
