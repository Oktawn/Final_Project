/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require("bcryptjs");
exports.seed = async function (knex) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync("123", salt);
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      username: "oktawn",
      password: hash,
      email: "11@g.ru",
    },
    {
      username: "admin",
      password: hash,
      email: "admin@admin.ru",
    }
  ]);
};
