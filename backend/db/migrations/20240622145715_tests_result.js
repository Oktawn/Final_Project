/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tests_result", (table) => {
    table.increments("id");
    table.integer("user_id").notNullable();
    table.float("wpm");
    table.float("raw");
    table.float("accuracy");
    table.string("mode").notNullable();
    table.boolean("complited").notNullable().defaultTo(true);
    table.date("created_at").defaultTo(knex.fn.now());
    table.foreign("user_id").references("user_id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tests_result");
};
