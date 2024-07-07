/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("user_id");
    table.string("username").unique().notNullable();
    table.string("password");
    table.string("email").unique().notNullable();
    table.date("created_at").defaultTo(knex.fn.now());
    table.string("avatar_url");
    table.integer("google_id").unique();
    table.boolean("is_google_user").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
