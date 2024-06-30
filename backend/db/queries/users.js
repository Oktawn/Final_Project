const bcrypt = require("bcryptjs");
const knex = require("../connection");

async function checkUserName(user) {
  const check = await knex("users")
    .select("users")
    .where("username", "=", user);
  return check.length > 0;
}

async function checkEmail(email) {
  const check = await knex("users").select("email").where("email", "=", email);
  return check.length > 0;
}

async function checkUser(email, password) {
  const user = await getUser(email);
  
  if (user.length && bcrypt.compareSync(password, user[0].password)) {
    return { status: true, user: user };
  } else {
    return { status: false, mes: "email or password is invalid" };
  }
}

async function addUserLocal(user, pass, email) {
  const salt = await bcrypt.genSalt();
  const hash = bcrypt.hashSync(pass, salt);
  return await knex("users")
    .insert([{ username: user, password: hash, email: email }])
    .returning(["user_id", "username", "email"]);
}

async function getUser(email) {
  return await knex("users")
    .select("*")
    .where("email", "=", email)
    .returning(["user_id", "username", "email", "avatar_url"]);
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
