import React, { useState } from "react";
import qr2 from "../assets/qr2.svg";
import qr from "../assets/qr.svg";
import student from "../assets/student.svg";
import teacher from "../assets/teacher.svg";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelection = (role) => {
    setSelected(role);
  };


  const roleHandler = (event) =>{
      event.preventDefault();

      if(selected == "student"){
          navigate('/loginstudent')
      }
      else if(selected == "teacher"){
          navigate('/loginteacher')
      }
  }

  return (
   
     
       
      <div className="parent-container">
        <div className="left">
          <div className="left-internal">
          <img className="style-svg" src={qr} alt="QR Code" />
          <div className="text-left-bg p-4">
            Automated attendance portal <br/> with anti-proxy system.
          </div>
          </div>
          
        </div>
        <div className="right">
          <div className="description-text">
            <p className="text-5xl">Welcome!</p>
          </div>
          <div className="role-text text-3xl">Select your role.</div>
          <div className="role-select md:flex md:flex-col lg:flex lg:flex-row">
            <div
              onClick={() => handleSelection("teacher")}
              className={`card bg-base-100 w-96 shadow-2xl cursor-pointer hover:opacity-70 ${
                selected === "teacher" ? "border-2 border-[#3498db]" : "border border-transparent"
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
              className={`card bg-base-100 w-96 shadow-2xl cursor-pointer hover:opacity-70 ${
                selected === "student" ? "border-2 border-[#3498db]" : "border border-transparent"
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
            <button  onClick={roleHandler} className="btn bg-info w-[30vw] text-white text-xl rounded-lg hover:hover:bg-infohover">Proceed</button>
            )}
          </div>
        </div>
      </div>
   
  );
};

export default Welcome;