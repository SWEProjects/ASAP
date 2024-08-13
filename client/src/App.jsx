import React from 'react'
import Welcome from './pages/Welcome'
import { Routes, Route } from 'react-router-dom'
import SignUpStudent from './pages/SignUpStudent'
import LoginStudent from './pages/LoginStudent'
import LoginTeacher from './pages/LoginTeacher'



const App = () => {
  return (
   <Routes>
       <Route  path="/" element={<Welcome/>}/>
       <Route path='/loginstudent' element={<LoginStudent/>}/>
       <Route path='/loginteacher' element = {<LoginTeacher/>}/>
       <Route path='/signupstudent' element = {<SignUpStudent/>}/>


   </Routes>
    
  )
}

export default App