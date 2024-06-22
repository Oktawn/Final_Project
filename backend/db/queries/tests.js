const knex = require("../connection");

const mods = {
  short: [0, 100],
  medium: [101, 300],
  long: [301, 600],
  epic: [601, 9999],
};

function getTest(mode, size) {
  if (mode === "quote")
    return knex
      .select("text")
      .from("tests")
      .where("length", ">=", mods[size][0])
      .andWhere("length", "<=", mods[size][1])
      .orderByRaw("RANDOM()")
      .limit(1);
  else
    return knex
      .select("text")
      .from("tests")
      .where("length", ">=", mods.long[0])
      .andWhere("length", "<=", mods.long[1])
      .orderByRaw("RANDOM()")
      .limit(1);
}

module.exports = {
  getTest,
};
