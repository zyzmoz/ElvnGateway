import {Router} from 'express';
import routesController, { IRoute } from '../database/routes';

const router = Router();

router.post('/', async (req, res) => {

  const route = req.body as IRoute;
  const op = await routesController.create(route);
  res.json(op);
});

router.get('/', async (req, res) => {
  const list: Array<IRoute>  = await routesController.find() 
  res.json(list);
});

router.post('/:id', async(req, res) => {
  const { id } = req.params;
  const route = {...req.body, id } as IRoute;
  const op = await routesController.update(route);
  res.json(op);
});

router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  await routesController.remove(id);
  res.json({"deleted": true});
});

export default router; 