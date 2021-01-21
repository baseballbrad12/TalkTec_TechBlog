//Require Sequelize and dotenv to connect database
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

//Sequelize to reference JAWSDB_URL
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  //If no JAWSDB_URL, Sequelize .env file created in root directory,
  //.env holds credentials to MySQL database
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

module.exports = sequelize;