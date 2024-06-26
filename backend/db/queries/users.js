const bcrypt = require("bcryptjs");
const knex = require("../connection");

async function checkUserName(user) {
  const check = await knex("users")
    .select("*")
    .where("username", "=", user.username);
  return check.length > 0;
}

async function checkEmail(user) {
  const check = await knex("users").select("*").where("email", "=", user.email);
  return check.length > 0;
}

async function checkUser(user) {
  if (await checkUserName(user)) {
    const pass = await knex("users")
      .select("*")
      .where("username", "=", user.username);
    if (bcrypt.compareSync(user.pass, pass[0].password)) {
      return { status: true, message: "user found" };
    } else {
      return { status: false, message: "invalid password" };
    }
  }
  return { status: false, message: "user not found" };
}

async function addUserLocal(user) {
  const salt = await bcrypt.genSalt();
  const hash = bcrypt.hashSync(user.pass, salt);
  return await knex("users")
    .insert([{ username: user.username, password: hash, email: user.email }])
    .returning("*");
}

module.exports = {
  addUserLocal,
  checkUser,
  checkUserName,
  checkEmail,
};
