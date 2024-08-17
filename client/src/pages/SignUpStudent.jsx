import React, { useState, useEffect } from "react";
import "./SignUpStudent.css";
import signup from "../assets/signup.svg";
import error401 from "../assets/401.svg"
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
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const emptyFields = () => toast.error("Fields marked * cannot be empty.");
  const rollError = () => toast.error("Use college roll only.");
  const semesterError = () => toast.error("Enter valid semester value.");
  const emailError = () => toast.error("Use college ID only.");
  const passwordMismatch = () => toast.error("Password did not match.");
  const serverError = () => toast.error("Error occurred while signing up.");
  const networkError = () => toast.error("Error occurred, Please try again later.");
  const userExists = () => toast.error("User already exists.");

  useEffect(() => {
    const checkUser = async () => {
      const isLoggedIn = await check();
      setLoggedIn(isLoggedIn);
      console.log(isLoggedIn);
    };

    checkUser();
  }, []);

  const registerHandler = async () => {
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
            <h2 className="card-title font-bold text-lg mb-4  text-info">You are already logged in.</h2>
            <p className="mb-4">Since you are already logged in, please log out first to sign up again or go to dashboard.</p>
            <div className="card-actions flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="btn btn-info" onClick={() => navigate("/studentdash")}>Go to Dashboard</button>
              <button onClick={logoutHandler} className="btn btn-info">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="signup-container">
      <div className="left-container">
        <Asap image={signup} />
      </div>

      <div className="right-container">
        <div className="welcome-message-signup text-5xl m-5 font-black">Welcome wanderer!</div>
        <div className="text-2xl mt-7 text-info font-medium">Enter valid details.</div>

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
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-[100%]"
            />
          </div>
          <div className="repassword-container-signup w-[100%]">
            <div className="repassword-signup">
              <p>Re Enter password</p>
              <span className="text-red-600"> *</span>
            </div>
            <input
              onChange={(event) => {
                setRepassword(event.target.value);
              }}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-[100%]"
            />
          </div>

          <button
            onClick={registerHandler}
            className="btn bg-info text-white text-xl rounded-lg hover:bg-infohover w-full mt-4"
          >
            {isRegistering ? <span className="loading loading-ring loading-md"></span> : "Register"}
          </button>

          <button
            onClick={() => { navigate('/loginstudent') }}
            className="btn bg-info text-white text-xl rounded-lg hover:bg-infohover w-full mt-4"
          >
            Back to Login
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default SignUpStudent;
