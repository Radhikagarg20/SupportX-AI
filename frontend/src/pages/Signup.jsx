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


function Signup() {

  const navigate =
    useNavigate();


  const [
    showPassword,
    setShowPassword
  ] = useState(false);


  const [
    formData,
    setFormData
  ] = useState({

    username: "",

    email: "",

    password: ""

  });


  const [
    message,
    setMessage
  ] = useState("");


  const [
    loading,
    setLoading
  ] = useState(false);


  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };


  // =========================
  // PASSWORD VALIDATION
  // =========================

  const passwordLength =
    formData.password.length >= 8;


  const passwordUppercase =
    /[A-Z]/.test(
      formData.password
    );


  const passwordNumber =
    /[0-9]/.test(
      formData.password
    );


  // =========================
  // NORMAL SIGNUP
  // =========================

  const handleSignup =
    async () => {

      if (
        !formData.username.trim() ||
        !formData.email.trim() ||
        !formData.password
      ) {

        setMessage(
          "Please fill in all fields."
        );

        return;

      }


      if (
        !passwordLength ||
        !passwordUppercase ||
        !passwordNumber
      ) {

        setMessage(
          "Password requirements not completed."
        );

        return;

      }


      setLoading(true);

      setMessage("");


      try {

        const response =
          await fetch(
            `${import.meta.env.VITE_API_URL}/signup`,
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json"

              },

              body: JSON.stringify({

                name:
                  formData.username,

                email:
                  formData.email,

                password:
                  formData.password

              })

            }

          );


        const data =
          await response.json();


        if (response.ok) {

          setMessage(
            "Signup Successful 🚀"
          );


          setTimeout(() => {

            navigate("/login");

          }, 1200);

        }

        else {

          setMessage(

            data.message ||
            "Signup failed."

          );

        }

      }

      catch (error) {

        console.error(
          "Signup Error:",
          error
        );


        setMessage(
          "Unable to connect to the server."
        );

      }

      finally {

        setLoading(false);

      }

    };


  // =========================
  // GOOGLE SIGNUP
  // =========================

  const googleSignup =
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
          user.displayName ||
          user.email
        );


        navigate(
          "/dashboard"
        );

      }

      catch (error) {

        console.error(
          "Google Signup Error:",
          error
        );


        setMessage(
          "Google Signup Failed"
        );

      }

    };


  return (

    <div className="auth-page">

      <div className="auth-box">


        <h1>
          SupportX AI
        </h1>


        <p>
          Create Account
        </p>


        {/* =========================
            USERNAME
        ========================= */}

        <input

          type="text"

          name="username"

          placeholder="Username"

          value={
            formData.username
          }

          onChange={
            handleChange
          }

        />


        {/* =========================
            EMAIL
        ========================= */}

        <input

          type="email"

          name="email"

          placeholder="Email Address"

          value={
            formData.email
          }

          onChange={
            handleChange
          }

        />


        {/* =========================
            PASSWORD
        ========================= */}

        <div className="password-box">


          <input

            type={
              showPassword
                ? "text"
                : "password"
            }

            name="password"

            placeholder="Password"

            value={
              formData.password
            }

            onChange={
              handleChange
            }

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

              ?

              <EyeOff
                size={18}
              />

              :

              <Eye
                size={18}
              />

            }

          </button>


        </div>


        {/* =========================
            PASSWORD RULES
        ========================= */}

        {formData.password && (

          <div className="password-rules">


            <p

              className={

                passwordLength

                  ?

                  "valid"

                  :

                  "invalid"

              }

            >

              • Minimum 8 characters

            </p>


            <p

              className={

                passwordUppercase

                  ?

                  "valid"

                  :

                  "invalid"

              }

            >

              • One uppercase letter

            </p>


            <p

              className={

                passwordNumber

                  ?

                  "valid"

                  :

                  "invalid"

              }

            >

              • One number

            </p>


          </div>

        )}


        {/* =========================
            SIGNUP BUTTON
        ========================= */}

        <button

          className="auth-btn"

          onClick={
            handleSignup
          }

          disabled={
            loading
          }

        >

          {loading

            ?

            "Creating Account..."

            :

            "Create Account"

          }

        </button>


        {/* =========================
            GOOGLE SIGNUP
        ========================= */}

        <button

          className="google-btn"

          onClick={
            googleSignup
          }

        >

          Continue with Google

        </button>


        {/* =========================
            MESSAGE
        ========================= */}

        <p className="auth-message">

          {message}

        </p>


        {/* =========================
            LOGIN LINK
        ========================= */}

        <Link

          className="auth-link"

          to="/login"

        >

          Already have an account?
          Login

        </Link>


      </div>

    </div>

  );

}


export default Signup;
