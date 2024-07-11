const knex = require("../connection");

function getResults(id) {
  return knex
    .select("wpm", "raw", "accuracy", "mode", "complied", "created_at")
    .from("tests_result")
    .where("user_id", id)
    .orderBy("created_at", "desc");
}

function addResult(user_id, wpm=0, raw=0, accuracy=0, mode, complited) {
  return knex("tests_result").insert([
    {
      user_id: user_id,
      wpm: wpm,
      raw: raw,
      accuracy: accuracy,
      mode: mode,
      complied: complited

    }
  ]);
}

function getStats(id) {
  return knex('tests_result')
    .select(
      knex.raw('COUNT(*) as start'),
      knex.raw('COUNT(*) FILTER (WHERE complied = true) as pass'),
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
