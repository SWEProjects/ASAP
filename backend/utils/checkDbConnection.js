const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('ASAP', 'postgres', '1532', {
  host: 'localhost',
  dialect: 'postgres',
});

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
