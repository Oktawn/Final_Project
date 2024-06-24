const bcrypt = require("bcryptjs");
const knex = require("../connection");

async function checkUser(user) {
  const check = await knex("users")
    .select("*")
    .where("username", "=", user.username);
  return check.length > 0;
}

async function checkEmail(user) {
  const check = await knex("users").select("*").where("email", "=", user.email);
  return check.length > 0;
}

async function addUserLocal(user) {
  const salt = await bcrypt.genSalt();
  const hash = bcrypt.hashSync(user.pass, salt);
  return await knex("users")
    .insert([{ username: user.username, password: hash, email: user.email }])
    .returning("*");
}

function updateUserLocal(user) {}

function getUserLocal(user) {}

module.exports = {
  addUserLocal,
  checkUser,
  checkEmail,
};
