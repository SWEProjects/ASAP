import React from "react";

import logo from "../assets/Designer.png";
const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-[#6EACDA] pt-4 pb-4">
        
        <div className="navbar-start hidden md:block mr-5">
        <p className="text-3xl  text-[#F5EDED] font-bold font-poppins ml-2">The Online Attendence Portal</p>
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
