const { Sequelize } = require('sequelize');

// Create a Sequelize instance and connect to the database
const sequelize = new Sequelize(
  process.env.DB_NAME || 'student_db', // Database name
  process.env.DB_USER || 'root', // MySQL username
  process.env.DB_PASSWORD || 'root', // MySQL password
  {
    host: process.env.DB_HOST || 'localhost', // MySQL host
    dialect: 'mysql', // MySQL dialect
    logging: false, // Disable SQL logging (optional)
  }
);

// Test the connection to the database
sequelize
  .authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection failed:', error));

module.exports = sequelize;
