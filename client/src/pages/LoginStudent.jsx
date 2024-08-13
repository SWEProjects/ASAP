import React, { useState, useRef } from "react";
import "./LoginStudent.css";
import login from "../assets/login.svg";
import Asap from "../components/Asap";
import { useNavigate } from "react-router-dom";

const LoginStudent = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef(null); // Step 1: Create a ref for the input element

  const togglePasswordVisibility = () => {
    const passwordInput = passwordInputRef.current; // Get the DOM node
    const cursorPosition = passwordInput.selectionStart; // Step 2: Save the cursor position

    setShowPassword(!showPassword); // Step 3: Toggle password visibility

    setTimeout(() => { // Step 4: Restore the cursor position after state update
      passwordInput.focus(); // Keep the input focused
      passwordInput.setSelectionRange(cursorPosition, cursorPosition); // Set cursor position
    }, 0); // Delay to allow DOM update
  };

  return (
    <div className="outer-container">
      <div className="left-container">
        <Asap image={login} />
      </div>
      <div className="right-container">
        <div className="login-welcome-message text-5xl"> Welcome Student! </div>

        <div className=" prompt-login text-3xl text-info ">
          {" "} Enter your credentials. {" "}
        </div>

        <div className="input-fields-login">
          <div className="email-login">
            <span className="text-xl"> Email</span>
            <label className="input  input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" />
            </label>
          </div>

          <div className="password-login">
            <span className="text-xl">Password</span>
            <label className="input  input-bordered flex items-center gap-2">
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
                type={showPassword ? "text" : "password"} // Toggle input type based on state
                ref={passwordInputRef} // Attach the ref to the input
              />
            </label>
            <div className="flex flex-row items-center gap-3 justify-end">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={togglePasswordVisibility} // Attach the toggle function to onChange
                className="checkbox size-5 ml-1 checkbox-info"
              />
              <span>Show password</span>
            </div>
          </div>
        </div>

        <div className="login-container w-[80%]">
          <button className="btn bg-info mt-16 text-white text-xl rounded-lg hover:bg-infohover">
            Login
          </button>
          <div className="link mt-2">Forget Password</div>
        </div>

        <div className="signup-prompt w-[80%] mt-11">
          <div className="text-xl text-info">New Student?</div>
          <button
            onClick={() => {
              navigate("/signupstudent");
            }}
            className="btn bg-info text-white text-xl rounded-lg hover:bg-infohover"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginStudent;
