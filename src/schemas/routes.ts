import Knex from 'knex';

export const createRoutesTable = async (knex: Knex) => {
  await knex.schema.createTableIfNotExists('routes', (table) => {
    table.increments();
    table.string('url');
    table.string('target');
    table.timestamps();
  });
}
