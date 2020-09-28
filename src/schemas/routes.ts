import Knex from 'knex';

export const createRoutesTable = async (knex: Knex) => {
  await knex.schema.createTableIfNotExists('routes', (table) => {
    table.increments();
    table.string('url');
    table.string('target');
    table.boolean('webSocket');
    table.boolean('ignoreBasePath');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}
