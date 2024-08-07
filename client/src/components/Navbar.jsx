import React from "react";

import logo from "../assets/Designer.png";
const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-[#F4A261] pt-6">
        
        <div className="navbar-start ml-5 p-1">
          <img className="h-16 " src={logo} alt="Logo" />
         
        </div>

        <div className="navbar-center hidden md:block mr-5">
        <p className="text-4xl  font-bold font-poppins ml-2">The Online Attendence Portal</p>
        </div>

        <div className="navbar-end">
          <div className="flex flex-row gap-4 mr-10">
            <a className="btn bg-transparent text-xl font-bold font-playfair">Login</a>
            <a className="btn text-xl font-bold font-playfair" >Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
