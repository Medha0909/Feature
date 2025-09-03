const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Teacher = sequelize.define("teachers", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  university_name: { type: DataTypes.STRING(100), allowNull: false },
  gender: { type: DataTypes.STRING(10), allowNull: false },
  year_joined: { type: DataTypes.INTEGER, allowNull: false },

}, {
  tableName: "teachers",
  timestamps: true
});


User.hasOne(Teacher, { foreignKey: "user_id", onDelete: "CASCADE" });
Teacher.belongsTo(User, { foreignKey: "user_id" });

module.exports = Teacher;
