const bcrypt = require("bcryptjs");
const knex = require("../connection");

async function checkUserName(user) {
  const check = await knex("users").select("*").where("username", "=", user);
  return check.length > 0;
}

async function checkEmail(email) {
  const check = await knex("users").select("*").where("email", "=", email);
  return check.length > 0;
}

async function checkUser(user) {
  if (await checkUserName(user)) {
    const pass = await knex("users")
      .select("*")
      .where("username", "=", user.username);
    if (bcrypt.compareSync(user.pass, pass[0].password)) {
      return { status: true, message: "Login successful" };
    } else {
      return { status: false, message: "Invalid username or password" };
    }
  }
  return { status: false, message: "Invalid username or password" };
}

async function addUserLocal(user, pass, email) {
  const salt = await bcrypt.genSalt();
  const hash = bcrypt.hashSync(pass, salt);
  return await knex("users")
    .insert([{ username: user, password: hash, email: email }])
    .returning("*");
}

async function getUser(user) {
  return await knex("users").select("*").where("username", "=", user);
}

async function getUserById(id) {
  return await knex("users").select("*").where("id", "=", id).first();
}

async function getUserByGoogleId(googleId) {
  return await knex("users")
    .select("*")
    .where("google_id", "=", googleId)
    .first();
}

async function addUserGoogle(googleId, displayName, email, avatarUrl) {
  return await knex("users")
    .insert({
      google_id: googleId,
      username: displayName,
      email: email,
      avatar_url: avatarUrl,
      is_google_user: true,
    })
    .returning("*");
}

async function updateUserAvatar(userId, avatarUrl) {
  return await knex("users")
    .where("user_id", userId)
    .update({ avatar_url: avatarUrl })
    .returning("*");
}

module.exports = {
  addUserLocal,
  checkUser,
  checkUserName,
  checkEmail,
  getUser,
  getUserById,
  getUserByGoogleId,
  addUserGoogle,
  updateUserAvatar,
};
