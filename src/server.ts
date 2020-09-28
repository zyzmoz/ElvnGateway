import express from 'express';
import http from 'http';
import 'dotenv/config';
import { initRoutes } from './routes/proxy-router';
import route from './routes/routes-router';
import { createSchemas } from './schemas';

const PORT = process.env.PORT || 80;

const server = express();

server.use(express.json());
createSchemas().then(() => server.use(route, initRoutes));

http.createServer(process.env.REDIRECT_AS_HTTPS ? (req, res) => {
  const { host } = req.headers;
  const { url } = req;
  res.writeHead(302, { "Location": `https://${host}${url}` });
  res.end();
} : server)
  .listen(PORT, () => console.log('Server listening on port:', PORT))
  ;

// https.createServer({
//   key: key,
//   cert: cert
// }, app).listen(443);


// server.listen(PORT, );