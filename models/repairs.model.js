const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Repairs = db.define('repairs', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    enum: ['pending', 'completed', 'cancelled'],
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Repairs;
