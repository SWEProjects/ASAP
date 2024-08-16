const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const cors = require('cors');  // Make sure to install this package

const { User } = require("../models");

const secret = process.env.SECRET_KEY;
console.log("Secret key:", secret);

// Add this to your main server file
// app.use(cors({
//   origin: 'http://your-frontend-domain.com', // Replace with your frontend URL
//   credentials: true
// }));

const login = async (req, res) => {
  const { email, password, isStudent } = req.body;
  console.log("Login attempt for email:", email);

  try {
    const isUserPresent = await User.findOne({ where: { email } });

    if (!isUserPresent) {
      console.log("User not found");
      res.status(401).json({
        message: "INVALID_USER",
      });
      return;
    }

    const databaseEmail = isUserPresent?.dataValues?.email;
    const hashedPassword = isUserPresent?.dataValues?.password;

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      console.log("Password mismatch");
      res.status(401).json({
        message: "WRONG_PASSWORD",
      });
      return;
    }

    if (passwordMatch) {
      console.log("Password match, generating token");
      const token = jwt.sign({ email: databaseEmail, isStudent }, secret, { expiresIn: '1h' });
      
      console.log("Attempting to set cookie");
      res.cookie('token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', // Use secure in production
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Adjust based on your setup
        maxAge: 3600000 // 1 hour
      });
      console.log("Cookie set attempt completed");

      res.status(200).json({
        message: "LOGIN_SUCCESSFUL",
        isLoggedIn: true,
        email: databaseEmail,
        isStudent


      });
      return;
    }

    res.status(500).json({
      message: "SERVER_ERROR"
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "SERVER_ERROR"
    });
  }
};

module.exports = login;