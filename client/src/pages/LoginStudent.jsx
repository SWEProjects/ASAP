import React, { useState, useRef, useEffect } from "react";
import "./LoginStudent.css";
import login from "../assets/login.svg";
import eyesOpen from "../assets/eyesOpen.svg"
import eyesClosed from "../assets/eyesClosed.svg"
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
  const [isFetchingStatus, setIsFetchingStatus] = useState(false);

  const invalidEmail = () => toast.error("Enter official mail only.");
  const wrongPassword = () => toast.error("Please enter correct password.");
  const invalidUser = () => toast.error("User not registered");
  const successLogin = () => toast.success("Login successful");
  const errorLogin = () => toast.error("Error during login");
  const serverError = () => toast.error("Unexpected server error");
  const fetchError = () => toast.error("An unknown error occurred");

  useEffect(() => {
    const checkUser = async () => {
      setIsFetchingStatus(true);
      const isLoggedIn = await check();
      setLoggedIn(isLoggedIn);

    };

    checkUser();

    setIsFetchingStatus(false);
  }, []);

  const logOutHandler = async () => {
    try {
      const response = await fetch(`${apiURL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('Logged out successfully!');
        navigate("/");
      } else {
        const errorMessage = await response.text();
        toast.error(`Logout failed: ${errorMessage}`);
      }
    } catch (error) {
      toast.error('An error occurred during logout. Please try again.');
    }
  };

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
    setIsLoggingIn(true);

    try {
      const response = await fetch(`${apiURL}/loginstudent`, {
        method: 'POST',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        successLogin();
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

  return (
    <>
      {isFetchingStatus ? (
        <div className="flex justify-center flex-col align-middle items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
          <div className="mt-4 text-lg">Please Wait</div>
        </div>
      ) : (
        <>
          {loggedIn ? (
           <div className="flex justify-center items-start h-screen pt-10 overflow-hidden">
           <div 
             role="alert" 
             className="alert shadow-xl flex flex-col md:flex-row justify-between items-center m-10 w-2/3 opacity-0 translate-y-[-100%] animate-slideDown"
           >
             <div className="flex items-center space-x-2">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 className="stroke-info h-6 w-6 shrink-0"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth="2"
                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                 ></path>
               </svg>
               <span>You are already signed in!</span>
             </div>
             <div className="flex space-x-2 mt-4 md:mt-0">
               <button onClick={() => {navigate("/studentdash")}} className="btn btn-sm">Go to dashboard</button>
               <button onClick={logOutHandler} className="btn btn-sm btn-primary text-white">Logout</button>
             </div>
           </div>
         </div>
          
          ) : (
            <div className="outer-container">
              <div className="left-container-login">
                <Asap image={login} />
              </div>
              <div className="right-container-login">
                <div className="login-welcome-message text-3xl mx-3">Welcome Student!</div>
                <div className="prompt-login text-lg text-info">Enter your credentials.</div>
                <div className="input-fields-login w-[45%]">
                  <div className="email-login">
                    <span className="text-md self-start">Email</span>
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
                        ref={passwordInputRef}
                        type={showPassword ? "text" : "password"}
                        className="grow"
                        placeholder="Password"
                      />
                      <button onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <img width={"25px"} height={"25px"} src={eyesOpen} />
                        ) : (
                          <img width={"25px"} height={"25px"} src={eyesClosed} />
                        )}
                      </button>
                    </label>
                  </div>
                </div>
                <div className="login-button mt-10 ">
                  <button
                    type="button"
                    className={`text-white h-10  w-52 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 `}
                    disabled={isLoggingIn}
                    onClick={loginHandler}
                  >
                    {isLoggingIn ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
                  </button>
                </div>
                <div className=" flex justify-between flex-col">
                  <a href="/forgot-password" className="text-sm text-info underline">
                    Forgot Password?
                  </a>
                  <button
                    onClick={() => { navigate("/signupstudent") }}
                    className={`text-white mt-5  w-52 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 `}

                  >
                    Go to Registration
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default LoginStudent;
