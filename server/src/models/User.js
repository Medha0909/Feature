const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("auth_user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING(100), unique: true, allowNull: false, validate: { isEmail: true } },
  first_name: { type: DataTypes.STRING(50) },
  last_name: { type: DataTypes.STRING(50) },
  password: { type: DataTypes.STRING(255), allowNull: false }
}, {
  tableName: "auth_user",
  timestamps: true
});

module.exports = User;
