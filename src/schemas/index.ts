import Knex from "knex";
import { createRoutesTable } from "./routes";

const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: process.env.DATABASE || './mydb.sqlite'   
  },
  useNullAsDefault: true
});


export const createSchemas = async () => {
  await createRoutesTable(knex);

}