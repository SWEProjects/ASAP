const express = require('express')
const signupStudent = require('./controllers/signupController')
const loginStudent = require('./controllers/loginController');
const authenticateJWT = require('./middleware/authMiddleware');
const validateUser = require('./controllers/authCheck');
const app = express.Router();


app.get('/', (req, res)=>{
    res.send("Hello from team ASAP")
});


app.post('/signupStudent', signupStudent);
app.post('/loginstudent', loginStudent);
app.get('/validateUser', authenticateJWT, validateUser);
app.post('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0), path: '/' });
    res.status(200).send('Logged out');
    console.log("logged out");
  });
  

module.exports = app;