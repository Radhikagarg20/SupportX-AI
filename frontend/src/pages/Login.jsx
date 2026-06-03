import "./Auth.css";

import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  Eye,
  EyeOff
} from "lucide-react";

import {
  signInWithPopup
} from "firebase/auth";

import {
  auth,
  provider
} from "../firebase";

function Login() {

  const navigate =
    useNavigate();

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [formData,
    setFormData] =
    useState({

      email: "",

      password: ""

    });

  const [message,
    setMessage] =
    useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  // NORMAL LOGIN

  const handleLogin =
    async () => {

      try {

        const response =
          await fetch(
            "http://127.0.0.1:5000/login",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json"

              },

              body: JSON.stringify(
                formData
              )

            }
          );

        const data =
          await response.json();

        if (response.ok) {

          localStorage.setItem(
            "token",
            data.token
          );

          localStorage.setItem(
            "username",
            data.name
          );

          navigate("/dashboard");

        } else {

          setMessage(
            data.message
          );

        }

      } catch (error) {

        setMessage(
          "Login Failed"
        );

      }

    };

  // GOOGLE LOGIN

  const googleLogin =
    async () => {

      try {

        const result =
          await signInWithPopup(
            auth,
            provider
          );

        const user =
          result.user;

        localStorage.setItem(
          "token",
          user.accessToken
        );

        localStorage.setItem(
          "username",
          user.displayName
        );

        navigate("/dashboard");

      } catch (error) {

        setMessage(
          "Google Login Failed"
        );

      }

    };

  return (

    <div className="auth-page">

      <div className="auth-box">

        <h1>SupportX AI</h1>

        <p>
          Enterprise Login
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="password-box">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="button"
            className="show-btn"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >

            {showPassword
              ? <EyeOff size={18} />
              : <Eye size={18} />
            }

          </button>

        </div>

        <button
          className="auth-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <button
          className="google-btn"
          onClick={googleLogin}
        >
          Continue with Google
        </button>

        <p className="auth-message">
          {message}
        </p>

        <Link
          className="auth-link"
          to="/forgot-password"
        >
          Forgot Password?
        </Link>

        <Link
          className="auth-link"
          to="/signup"
        >
          Create New Account
        </Link>

      </div>

    </div>

  );

}

export default Login;