/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tests_result').del()
  await knex("tests_result").insert([
    {
      user_id: 1,
      wpm: 40,
      raw: 45,
      accuracy: 80,
      mode: "quite short",
    },
    {
      user_id: 1,
      wpm: 60,
      raw: 86,
      accuracy: 40,
      mode: "quite short",
    },
    {
      user_id: 1,
      wpm: 60,
      raw: 86,
      accuracy: 40,
      mode: "quite short",
      complied: 0,
    },
  ]);
};
//knex migrate:latest --env development
// knex seed:run --env development