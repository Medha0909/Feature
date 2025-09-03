const sequelize = require("../config/db");
require("../models/User");
require("../models/Teacher");

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database synced");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
