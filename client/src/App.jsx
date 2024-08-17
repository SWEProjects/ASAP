import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import SignUpStudent from "./pages/SignUpStudent";
import LoginStudent from "./pages/LoginStudent";
import LoginTeacher from "./pages/LoginTeacher";
import StudentDashBoard from "./pages/StudentDashBoard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/loginstudent" element={<LoginStudent />} />
        <Route path="/loginteacher" element={<LoginTeacher />} />
        <Route path="/signupstudent" element={<SignUpStudent />} />
        <Route path= "/studentdash" element = {<StudentDashBoard/>} />
      </Routes>
    </div>
  );
};

export default App;
