import React, { useState, useRef, useEffect } from "react";
import "./LoginStudent.css";
import login from "../assets/login.svg";
import Asap from "../components/Asap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiURL = import.meta.env.VITE_APP_API_URL;
import { useDispatch } from "react-redux";
import check from "../utils/IsUserValid";
import error401 from "../assets/401.svg"

const LoginStudent = () => {
  const emailRegex = /^[a-zA-Z0-9._-]+@iiitbh\.ac\.in$/i;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const passwordInputRef = useRef(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const invalidEmail = () => toast.error("Enter official mail only.");
  const wrongPassword = () => toast.error("Please enter correct password.");
  const invalidUser = () => toast.error("User not registered");
  const successLogin = () => toast.success("Login successful");
  const errorLogin = () => toast.error("Error during login");
  const serverError = () => toast.error("Unexpected server error");

  useEffect(() => {
    const checkUser = async () => {
      const isLoggedIn = await check();
      setLoggedIn(isLoggedIn);
      console.log(isLoggedIn);
    };

    checkUser();
  }, []);


  const logOutHandler = async () => {
    try {
      const response = await fetch(`${apiURL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent with the request
      });

      if (response.ok) {
        toast.success('Logged out successfully!');
        navigate("/");
      } else {
        const errorMessage = await response.text(); // Get the error message from the response
        toast.error(`Logout failed: ${errorMessage}`);
      }
    } catch (error) {
      toast.error('An error occurred during logout. Please try again.');
    }
  }

  

  const togglePasswordVisibility = () => {
    const passwordInput = passwordInputRef.current;
    const cursorPosition = passwordInput.selectionStart;

    setShowPassword(prev => !prev);

    setTimeout(() => {
      passwordInput.focus();
      passwordInput.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  const loginHandler = async () => {
    if (!emailRegex.test(email)) {
      invalidEmail();
      return;
    }

    const data = { email, password, isStudent: true };
    console.log(data);
    setIsLoggingIn(true);

    try {
      const response = await fetch(`${apiURL}/loginstudent`, {
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        successLogin();
        // dispatch(checkLoginSuccess(result.isLoggedIn, result.email, result.isStudent));
        navigate('/studentdash');
      } else {
        switch (result.message) {
          case "INVALID_USER":
            invalidUser();
            break;
          case "WRONG_PASSWORD":
            wrongPassword();
            break;
          case "SERVER_ERROR":
            serverError();
            break;
          default:
            errorLogin();
        }
      }
    } catch {
      errorLogin();
    } finally {
      setIsLoggingIn(false);
    }
  };

  return loggedIn ? (
<div className="flex w-full h-screen flex-col md:flex-row">
  <div className="flex-1 bg-info flex items-center justify-center p-4">
    <Asap image={error401} />
  </div>

  <div className="flex-1 flex items-center justify-center p-4">
    <div
      className="card bg-base-100 w-96 shadow-xl p-6"
      style={{ boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.06)' }}
    >
      <div className="card-body">
        <h2 className="card-title font-bold text-lg mb-4 text-info">You are already logged in.</h2>
        <p className="mb-4">Since you are already logged in, please log out first to login again or go to dashboard.</p>
        <div className="card-actions flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="btn btn-info" onClick={() => navigate("/studentdash")}>Go to Dashboard</button>
          <button onClick={logOutHandler} className="btn btn-info">Logout</button>
        </div>
      </div>
    </div>
  </div>
</div>



  
  ) : (
    <div className="outer-container">
      <div className="left-container-login">
        <Asap image={login} />
      </div>
      <div className="right-container-login">
        <div className="login-welcome-message text-5xl mx-3">
          Welcome Student!
        </div>

        <div className="prompt-login text-3xl text-info">
          Enter your credentials.
        </div>

        <div className="input-fields-login w-[45%]">
          <div className="email-login">
            <span className="text-md self-start"> Email</span>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                onChange={(event) => setEmail(event.target.value)}
                type="text"
                className="grow"
                placeholder="Email"
              />
            </label>
          </div>

          <div className="password-login">
            <span className="text-md self-start">Password</span>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                onChange={(event) => setPassword(event.target.value)}
                type={showPassword ? "text" : "password"}
                ref={passwordInputRef}
              />
            </label>
            <div className="flex flex-row items-center gap-3 justify-end">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={togglePasswordVisibility}
                className="checkbox size-5 ml-1 checkbox-info"
              />
              <span>Show password</span>
            </div>
          </div>
        </div>

        <div className="login-container w-[45%]">
          <button
            onClick={loginHandler}
            className="btn bg-info mt-16 text-white text-xl rounded-lg hover:bg-infohover"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? <span className="loading loading-ring loading-md"></span> : "Login"}
          </button>
          <div className="link mt-2">Forget Password</div>
        </div>

        <div className="signup-prompt mt-11 w-[45%] pb-8">
          <div className="text-xl text-info">New Student?</div>
          <button
            onClick={() => navigate("/signupstudent")}
            className="btn bg-info text-white text-xl rounded-lg hover:bg-infohover"
          >
            Signup
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default LoginStudent;
