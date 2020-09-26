import Knex from 'knex';
import {Router} from 'express';

interface Route {
  id?: number,
  url: string,
  target: string
}


const knex = Knex({
  client: 'sqlite3',
  connection: {
    filename: "./mydb.sqlite"    
  },
  useNullAsDefault: true
});

const router = Router();

router.post('/', async (req, res) => {

  const route = req.body as Route;
  const op = await knex('routes').insert(route).returning('*');
  res.json(op);
});

router.get('/', async (req, res) => {
  const list: Array<Route>  = await knex('routes').select<Array<Route>>('*');
  res.json(list);
});

router.post('/:id', async(req, res) => {
  const { id } = req.params;
  const route = req.body as Route;
  const op = await knex('routes').where({id}).update(route).returning('*');
  res.json(op);
});

router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  await knex('routes').where({id}).delete();
  res.json({"deleted": true});
});

export default router; 