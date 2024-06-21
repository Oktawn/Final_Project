require("dotenv").config({ path: path.join(__dirname, ".env") });
const cfg = require("./knexfile.js")[process.env.NODE_ENV];

module.exports = require("knex")(cfg);
