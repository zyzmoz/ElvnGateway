import Knex from 'knex';

export interface IRoute {
  id?: number,
  url: string,
  target: string,
  webSocket?:boolean,
  ignoreBasePath?: boolean
}

const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"    
  },
  useNullAsDefault: true
});

export const create = (route : IRoute) => {
  return knex('routes').insert(route).returning('*');
}

export const update = (route: IRoute) => {
  return knex('routes').where({id: route.id}).update(route).returning('*');
}

export const find = () => {
  return knex('routes').select<Array<IRoute>>('*');
}

export const findOne = (id: number) => {
  return knex('routes').where({id}).select<Array<IRoute>>('*');
}

export const remove = (id: any) => {
  return knex('routes').where({id}).delete();
}


export default {
  create,
  update,
  find,
  remove,
  findOne
}