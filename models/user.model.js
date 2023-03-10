const { DataTypes } = require('sequelize');
const { db } = require('../database/db');
const User = db.define('user', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
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
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'client',
    enum: ['client', 'employed'],
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'enabled',
    enum: ['disabled', 'enabled'],
  },
});

module.exports = User;
