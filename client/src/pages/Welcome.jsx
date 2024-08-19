import React, { useState, useEffect } from "react";
import qr2 from "../assets/qr2.svg";
import qr from "../assets/qr.svg";
import student from "../assets/student.svg";
import teacher from "../assets/teacher.svg";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";
import Asap from "../components/Asap";
import check from "../utils/IsUserValid";

const Welcome = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [isFetchingStatus, setIsFetchingStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleSelection = (role) => {
    setSelected(role);
  };

  const roleHandler = (event) => {
    event.preventDefault();

    if (selected === "student") {
      if (isLoggedIn) {
        navigate("/studentdash")
      }
      else {
        navigate('/loginstudent')
      }

    }
    else if (selected === "teacher") {
      navigate('/loginteacher')
    }
  }

  useEffect(() => {
    setIsFetchingStatus(false);
    const checkUser = async () => {
      const isLogged = await check(); 
      
      setIsLoggedIn(isLogged);


    };

    checkUser();

    setIsFetchingStatus(false);
  }, []);

  return (
    <>
      {isFetchingStatus ? (
        <div className="flex justify-center flex-col align-middle items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
          <div className="mt-4 text-lg">Please Wait</div>
        </div>
      ) : (
        <div className="parent-container">
          <div className="left">
            <Asap image={qr} />
          </div>
          <div className="right max-h-screen">
            <div className="description-text">
              <p className="text-4xl">Welcome!</p>
            </div>
            <div className="role-text text-xl">Select your role.</div>
            <div className="role-select flex flex-col  lg:flex-row m-4">
              <div
                onClick={() => handleSelection("teacher")}
                className={`card bg-base-100 w-80 h-80 shadow-2xl cursor-pointer hover:opacity-70 ${selected === "teacher" ? "border-2 border-[#3498db]" : "border border-transparent"
                  }`}
              >
                <figure>
                  <img src={teacher} alt="Teacher" className="img-role" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Teacher</h2>
                </div>
              </div>

              <div
                onClick={() => handleSelection("student")}
                className={`card bg-base-100 w-80 h-80 shadow-2xl cursor-pointer hover:opacity-70 ${selected === "student" ? "border-2 border-[#3498db]" : "border border-transparent"
                  }`}
              >
                <figure>
                  <img src={student} alt="Student" className="img-role" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Student</h2>
                </div>
              </div>
            </div>

            <div className="proceed-button">
              {selected && (
                <button onClick={roleHandler} className="text-white  w-52 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  dark:focus:ring-blue-800 ">Proceed</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Welcome;