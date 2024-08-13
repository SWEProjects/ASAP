import React from "react";
import "./SignUpStudent.css";
import signup from "../assets/signup.svg";
import Asap from "../components/Asap";
import { useState } from "react";

const SignUpStudent = () => {
    const rollRegex = /^[0-9]{7}(?!([a-zA-Z])\1)[a-zA-Z]{2}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@iiitbh\.ac\.in$/i;

    const [firstname, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [roll, setRollNumber] = useState("");
    const [semester, setSemester] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [emptyError, setEmptyError] = useState(false);
  
    const registerHandler = () => {
      if (firstname === "" || roll === "" || semester === "" || email === "" || password === "" || repassword === "") {
        setEmptyError(true);
        return;
      }
      setEmptyError(false);

      let valid = true;
      


      if(emptyError === false){

            if(rollRegex.test(roll)){
                valid = valid & true;
                if( document.getElementById("roll").textContent != "")  document.getElementById("roll").textContent = "";
            }
            else{
                document.getElementById("roll").textContent = "Use college roll only."
            }


            if(semester > 0 && semester <9){
                valid = valid & true;
                if( document.getElementById("semester").textContent != "")  document.getElementById("semester").textContent = "";

            }
            else{
                document.getElementById("semester").textContent = "Enter valid semester value."
            }


            if(emailRegex.test(email)){
                valid = valid & true;
                if( document.getElementById("email").textContent != "")  document.getElementById("email").textContent = "";

            }
            else{
                  document.getElementById("email").textContent = "Use college id only";
            }

            if(password === repassword){
                valid = valid & true;
                if( document.getElementById("passwordError").textContent != "")  document.getElementById("passwordError").textContent = "";

            }
            else{
                document.getElementById("passwordError").textContent = "Password did not match";
            }


            if(valid){
                console.log("Ready");
            }
            else{
                window.alert("Some error in validation, make sure to use official and correct data only")
            }
      }



    };

  return (
    <div className="signup-container">
      <div className="left-container">
        <Asap image={signup} />
      </div>

      <div className="right-container">
        <div className="welcome-message-signup text-5xl">Welcome wanderer!</div>

        <div className="text-2xl mt-7 text-info ">Enter valid details.</div>

        <div className="input-fields-signup mt-7">
          <div className="name-container">
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
              <div className="text-sm mt-[-8px] ml-1 text-red-600 h-3">
                
              </div>
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
              <div id="roll" className="text-sm mt-[-8px] ml-1 text-red-600 h-3">
                
              </div>
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
              <div id="semester" className="text-sm mt-[-8px] ml-1 text-red-600 h-3">
                               
            </div>
            </div>
          </div>

          <div className="email-container-signup w-[100%]">
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
              className="input input-bordered w-[100%] "
            />
            <div id="email" className="text-sm  ml-1 text-red-600 h-3">
               
            </div>
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
              className="input input-bordered w-[100%] "
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
              className="input input-bordered w-[100%] "
            />
             {emptyError &&  <div className="text-sm mt-[1px] ml-1 text-red-600 h-3">
               <p className="text-red-600">  Field marked * can not be empty.</p>
            </div>}
            <div id="passwordError" className="text-sm mt-[1px] ml-1 text-red-600 h-3">
                
            </div>
          </div>

          <button
            onClick={registerHandler}
            className="btn bg-info text-white text-xl rounded-lg hover:bg-infohover w-full mt-4"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpStudent;
