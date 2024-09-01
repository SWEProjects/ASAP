const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,        // Database name
  process.env.DB_USER,        // Username
  process.env.DB_PASSWORD,    // Password
  {
    host: process.env.DB_HOST,  // Host URL
    dialect: 'postgres',        // Database dialect
    port: process.env.DB_PORT,  // Port (5432 in this case)
                
  }
);

async function checkConnection() {
  try {
    await sequelize.authenticate();
    {
        sequelize.sync({ alter: true });   
        // remove upper line in production..

    }

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { checkConnection };
