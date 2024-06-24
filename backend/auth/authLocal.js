const pass = require("koa-passport");
const knex = require("../db/connection.js");
const bcrypt = require("bcryptjs");
const localSt = require("passport-local");

const opt = {};

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

pass.use(
  new localSt(opt, (username, pass, done) => {
    knex("users")
      .where({ username })
      .first()
      .then((user) => {
        if (!user) return done(null, false);
        if (!bcrypt.compareSync(pass, user.password)) return done(null, user);
        else return done(null, false);
      })
      .catch((err) => {
        return done(err);
      });
  })
);
