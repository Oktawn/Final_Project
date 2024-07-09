const knex = require("../connection");

function getResults(id) {
  return knex
    .select("wpm", "raw", "accuracy", "mode", "complited", "created_at")
    .from("tests_result")
    .where("user_id", id)
    .orderBy("created_at", "desc");
}

function addResult(result) {
  return knex("tests_result").insert(result);
}

function getStats(id) {
  return knex('tests_result')
    .select(
      knex.raw('COUNT(*) as started_tests'),
      knex.raw('COUNT(*) FILTER (WHERE complited = true) as passed_tests'),
      knex.raw('MAX(wpm) as max_wpm'),
      knex.raw('AVG(raw) as avg_wpm'),
      knex.raw('MAX(accuracy) as max_accuracy'),
      knex.raw('AVG(accuracy) as avg_accuracy')
    )
    .where('user_id', id);
}

module.exports = {
  getResults,
  getStats,
  addResult
};
