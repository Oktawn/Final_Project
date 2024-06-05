const pg = require("pg");

const pool = new pg.Pool({
  user: "cuba",
  password: "cuba",
  database: "final",
});

module.exports = pool;
