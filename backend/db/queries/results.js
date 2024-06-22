const knex = require("../connection");

function getResults(id) {
  return knex
    .select("wpm", "raw", "accuracy", "mode", "created_at")
    .from("tests_result")
    .where("user_id", id)
    .orderBy("created_at", "desc");
}

function addResult(result) {
  return knex("tests_result").insert(result);
}

module.exports = {
  getResults,
  addResult,
};
