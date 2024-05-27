import "./VerifyEmail.css";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../api/api";
import { UserDataContext, TokenDataContext } from "../../context/Context";

const VerifyEmail = () => {
  const [sixDigitCode, setSixDigitCode] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const { token, setToken } = useContext(TokenDataContext);

  const verifyEmailHandler = async (event) => {
    event.preventDefault();

    const res = await fetch(`${backendUrl}/user/verifyemail`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(sixDigitCode),
      credentials: "include",
    });

    const data = await res.json();

    if (!data.result)
      return setErrorMessage(data.message || "Failed verify email");

    setErrorMessage("");
    setSuccessMessage(
      `${user.firstName} you have verified your email successfully`
    );
    console.log(data);
  };
  return (
    <main>
      <h1>Hey {user.firstName}, please verify your Email</h1>
      <form>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <div>
          <label htmlFor="sixDigitCode">Six Digit Code</label>
          <input
            id="sixDigitCode"
            type="text"
            value={sixDigitCode}
            onChange={(event) => setSixDigitCode(event.target.value)}
          />
        </div>

        <button onClick={verifyEmailHandler}>Verify Email</button>
      </form>

      {successMessage && (
        <>
          <p style={{ color: "green" }}>{successMessage}</p>
          <Link to="/login">Go to Login</Link>
        </>
      )}
    </main>
  );
};

export default VerifyEmail;
