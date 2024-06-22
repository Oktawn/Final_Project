const pass = require("koa-passport");
const knex = require("../db/connection.js");
const bcrypt = require("bcryptjs");

pass.serializeUser((user, done) => {
  done(null, user.id);
});

pass.deserializeUser(async (id, done) => {
  return knex("users")
    .where({ id })
    .first()
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});
