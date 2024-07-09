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
      knex.raw('COUNT(*) as start'),
      knex.raw('COUNT(*) FILTER (WHERE complited = true) as pass'),
      knex.raw('CAST( MAX(wpm) as Integer)as max_wpm'),
      knex.raw('CAST(AVG(wpm) AS INTEGER) as avg_wpm'),
      knex.raw('CAST(MAX(raw) AS INTEGER) as max_raw'),
      knex.raw('CAST(AVG(raw) AS INTEGER) as avg_raw'),
      knex.raw('CAST( MAX(accuracy) AS INTEGER) as max_acc'),
      knex.raw('CAST(AVG(accuracy) AS INTEGER) as avg_acc')
    )
    .where('user_id', id);
}

module.exports = {
  getResults,
  getStats,
  addResult
};
