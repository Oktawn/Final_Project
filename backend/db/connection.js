require("dotenv").config();
const cfg = require("../knexfile.js")[process.env.NODE_ENV];

console.log(process.env.NODE_ENV);

module.exports = require("knex")(cfg);
