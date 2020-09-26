import express from 'express';
import 'dotenv/config';
import { initRoutes } from './routes/proxy-router';
import route from './routes/route-router';
import { createSchemas } from './schemas';

const PORT = process.env.PORT || 80;

const server = express();

server.use(express.json());
createSchemas().then(() => server.use(route, initRoutes));

// server.use(initRoutes);
server.listen(PORT, () => console.log('Server listening on port:', PORT));