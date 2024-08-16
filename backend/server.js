const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const cookieParser = require('cookie-parser')
require('dotenv').config();

const { checkConnection }  = require('./utils/checkDbConnection') 

const app = express();
const PORT = process.env.PORT || 8000;

const corsOption = {
  origin : 'http://localhost:5173',
  credentials:true
};

app.use(cookieParser());
app.use(cors(corsOption)); // Enable CORS (optional)
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies


const appRoutes = require('./app');


app.use('/api', appRoutes); 


app.get('/', (req, res) => {
  res.send("Use /api to access the server.");
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

checkConnection();
