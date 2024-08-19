import React, { useState, useEffect, useRef } from "react";
import "./SignUpStudent.css";
import signup from "../assets/signup.svg";
import error401 from "../assets/401.svg"
import eyesOpen from "../assets/eyesOpen.svg"
import eyesClosed from "../assets/eyesClosed.svg"
import Asap from "../components/Asap";
const apiUrl = import.meta.env.VITE_APP_API_URL;
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import check from "../utils/IsUserValid";

const SignUpStudent = () => {
  const navigate = useNavigate();

  const rollRegex = /^[0-9]{7}(?!([a-zA-Z])\1)[a-zA-Z]{2}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@iiitbh\.ac\.in$/i;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roll, setRollNumber] = useState("");
  const [semester, setSemester] = useState("");
  const [email, setEmail] = useState("");
  const passwordInputRef = useRef(null);
  const rePasswordInputRef = useRef(null);
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isFetchingStatus, setIsFetchingStatus] = useState(false);

  const emptyFields = () => toast.error("Fields marked * cannot be empty.");
  const rollError = () => toast.error("Use college roll only.");
  const semesterError = () => toast.error("Enter valid semester value.");
  const emailError = () => toast.error("Use college ID only.");
  const passwordMismatch = () => toast.error("Password did not match.");
  const serverError = () => toast.error("Error occurred while signing up.");
  const networkError = () => toast.error("Error occurred, Please try again later.");
  const userExists = () => toast.error("User already exists.");
  const spaceProvided = () => toast.error("Only blankspace can not be provided.")

  useEffect(() => {
    setIsFetchingStatus(true);
    const checkUser = async () => {
      const isLoggedIn = await check();
      setLoggedIn(isLoggedIn);
      console.log(isLoggedIn);
    };

    checkUser();

    setIsFetchingStatus(false);
  }, []);

  const togglePasswordVisibilityPassword = () => {
    const passwordInput = passwordInputRef.current;
    const cursorPosition = passwordInput.selectionStart;

    setShowPassword(prev => !prev);

    setTimeout(() => {
      passwordInput.focus();
      passwordInput.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

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

  const togglePasswordVisibilityRePassword = () => {
    const passwordInput = rePasswordInputRef.current;
    const cursorPosition = passwordInput.selectionStart;

    setShowRePassword(prev => !prev);

    setTimeout(() => {
      rePasswordInputRef.focus();
      rePasswordInputRef.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  const registerHandler = async () => {
    if (firstName.trim().length == 0 || email.trim().length == 0 || password.trim().length == 0 || repassword.trim().length == 0) {
      spaceProvided();
      return;
    }

    if (
      firstName === "" ||
      roll === "" ||
      semester === "" ||
      email === "" ||
      password === "" ||
      repassword === ""
    ) {
      emptyFields();
      return;
    }


    let valid = true;

    if (!rollRegex.test(roll)) {
      rollError();
      valid = false;
    }

    if (!(semester > 0 && semester < 9)) {
      semesterError();
      valid = false;
    }

    if (!emailRegex.test(email)) {
      emailError();
      valid = false;
    }

    if (password !== repassword) {
      passwordMismatch();
      valid = false;
    }

    if (valid) {
      setIsRegistering(true);
      const data = { firstName, lastName, roll, semester, email, password };

      try {
        const response = await fetch(
          `${apiUrl}/signupStudent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const result = await response.json();

        if (response.ok) {
          toast.success(result.message);
          navigate('/loginstudent')
        } else {
          if (result.message === "USER_EXISTS") {
            userExists();
          } else {
            serverError();
          }
        }
      } catch (error) {
        networkError();
      }

      setIsRegistering(false);
    }
  };

  const logoutHandler = async () => {
    try {
      const response = await fetch(`${apiUrl}/logout`, {
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

  return (
    <>
      {isFetchingStatus ? (
        <div className="flex justify-center flex-col align-middle items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
          <div className="mt-4 text-lg">Please Wait</div>
        </div>
      ) : loggedIn ? (
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
        <div className="signup-container">
          <div className="left-container">
            <Asap image={signup} />
          </div>
  
          <div className="right-container">
            <div className="welcome-message-signup text-3xl m-5 font-black">Welcome wanderer!</div>
            <div className="text-lg mt-7 text-info font-medium">Enter valid details.</div>
  
            <div className="input-fields-signup mt-7 m-7 w-[45%]">
              <div className="name-container sm:flex-col">
                <div className="first">
                  <div className="input-style">
                    <p>First Name</p>
                    <span className="text-red-600">*</span>
                  </div>
                  <input
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    type="text"
                    placeholder="John"
                    className="input input-bordered w-full max-w-xs mt-[-8px]"
                  />
                </div>
                <div className="last">
                  <div className="input-style">
                    <p>Last Name</p>
                  </div>
                  <input
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full max-w-xs mt-[-8px]"
                  />
                </div>
              </div>
  
              <div className="section-roll-container">
                <div className="roll">
                  <div className="input-style">
                    <p>Roll Number</p>
                    <span className="text-red-600">*</span>
                  </div>
                  <input
                    onChange={(event) => {
                      setRollNumber(event.target.value);
                    }}
                    type="text"
                    placeholder="2201014CS"
                    className="input input-bordered w-full max-w-xs mt-[-8px]"
                  />
                </div>
                <div className="semester">
                  <div className="input-style">
                    <p>Semester</p>
                    <span className="text-red-600">*</span>
                  </div>
                  <input
                    onChange={(event) => {
                      setSemester(event.target.value);
                    }}
                    type="text"
                    placeholder="5"
                    className="input input-bordered w-full max-w-xs mt-[-8px]"
                  />
                </div>
              </div>
  
              <div className="email-container-signup w-full">
                <div className="email-signup">
                  <p>College ID</p>
                  <span className="text-red-600"> *</span>
                </div>
                <input
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-[100%]"
                />
              </div>
  
              <div className="password-container-signup w-[100%]">
                <div className="password-signup">
                  <p>Password</p>
                  <span className="text-red-600"> *</span>
                </div>
                <div className="input input-bordered border-lg  flex flex-row justify-center align-middle items-center justify-between">
                  <input
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    ref={passwordInputRef}
                    type={showPassword ? "text" : "password"}
                    placeholder="Type here"
                    className="w-[90%]"
                  />
                  <button onClick={togglePasswordVisibilityPassword}>
                    {showPassword ? (
                      <img width={"25px"} height={"25px"} src={eyesOpen} alt="Hide password" />
                    ) : (
                      <img width={"25px"} height={"25px"} src={eyesClosed} alt="Show password" />
                    )}
                  </button>
                </div>
              </div>
              <div className="repassword-container-signup w-[100%]">
                <div className="repassword-signup">
                  <p>Re Enter password</p>
                  <span className="text-red-600"> *</span>
                </div>
                <div className="input input-bordered border-lg  flex flex-row justify-center align-middle items-center justify-between">
                  <input
                    onChange={(event) => {
                      setRepassword(event.target.value);
                    }}
                    ref={rePasswordInputRef}
                    type={showRePassword ? "text" : "password"}
                    placeholder="Type here"
                    className="w-[90%]"
                  />
                  <button onClick={togglePasswordVisibilityRePassword}>
                    {showRePassword ? (
                      <img width={"25px"} height={"25px"} src={eyesOpen} alt="Hide password" />
                    ) : (
                      <img width={"25px"} height={"25px"} src={eyesClosed} alt="Show password" />
                    )}
                  </button>
                </div>
              </div>
  
              <div className="flex flex-col  gap-4 mt-10">
                <button
                  onClick={registerHandler}
                  className="text-white  w-52 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isRegistering ? <span className="loading loading-ring loading-md"></span> : "Register"}
                </button>
  
                <button
                  onClick={() => { navigate('/loginstudent') }}
                  className="text-white  w-52 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default SignUpStudent;
