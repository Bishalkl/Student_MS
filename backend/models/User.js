const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Add createdAt and updatedAt fields automatically
});

// Sync the model with the database
sequelize.sync({alter: true})
  .then(() => console.log('User table created successfully'))
  .catch((error) => console.error('Error creating table:', error));

module.exports = User;
