import "./Auth.css";

import {
  useState
} from "react";

import {
  sendPasswordResetEmail
} from "firebase/auth";

import {
  auth
} from "../firebase";

import {
  Link
} from "react-router-dom";

function ForgotPassword() {

  const [email,
    setEmail] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  const resetPassword =
    async () => {

      try {

        await sendPasswordResetEmail(
          auth,
          email
        );

        setMessage(
          "Reset email sent successfully"
        );

      } catch (error) {

        setMessage(
          "Failed to send email"
        );

      }

    };

  return (

    <div className="auth-page">

      <div className="auth-box">

        <h1>
          Reset Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <button
          className="auth-btn"
          onClick={resetPassword}
        >
          Send Reset Link
        </button>

        <p className="auth-message">
          {message}
        </p>

        <Link
          className="auth-link"
          to="/login"
        >
          Back to Login
        </Link>

      </div>

    </div>

  );

}

export default ForgotPassword;