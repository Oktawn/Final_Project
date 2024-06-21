const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const BASE_PATH = path.join(__dirname, "db");

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
  },
};
