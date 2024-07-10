const bcrypt = require("bcryptjs");
const knex = require("../connection");

async function checkNewUser(user, email) {
  return await knex
    .select("username", "email")
    .from("users")
    .where("username", "=", user)
    .orWhere("email", "=", email);
}

async function checkUser(username, password) {
  const user = await getUser(username);

  if (user.length && bcrypt.compareSync(password, user[0].password)) {
    return { status: true, user: user[0] };
  } else {
    return { status: false, mes: "email or password is invalid" };
  }
}

async function addUserLocal(user,email, pass ) {
  const salt = await bcrypt.genSalt();
  const hash = bcrypt.hashSync(pass, salt);
  return await knex("users")
    .insert([{ username: user, password: hash, email: email }])
    .returning(["user_id", "username", "email"]);
}

async function getUser(username) {
  return await knex("users")
    .select("user_id", "username", "email", "avatar_url","password")
    .where("username", username);
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
  checkNewUser,
  addUserLocal,
  checkUser,
  getUser,
  getUserById,
  getUserByGoogleId,
  addUserGoogle,
  updateUserAvatar,
};
