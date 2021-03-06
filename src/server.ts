import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import http from 'http';
import 'dotenv/config';
import { initRoutes } from './routes/proxy-router';
import route from './routes/routes-router';
import { createSchemas } from './schemas';

const PORT = process.env.PORT || 80;

const server = express();
server.use('/ui', express.static(path.join(__dirname, 'ui')));

server.get('/ui', (req, res) => {
  if (fs.existsSync(`${path.join(__dirname, 'ui')}index.html`)) {
    res.sendFile(`${path.join(__dirname, 'ui')}index.html`);
  } else {
    res.send("UI not found!")
  }
})

server.use(express.json());
server.use(cors());
createSchemas().then(() => server.use(route, initRoutes));

http.createServer(process.env.REDIRECT_AS_HTTPS ? (req, res) => {
  const { host } = req.headers;
  const { url } = req;
  res.writeHead(302, { "Location": `https://${host}${url}` });
  res.end();
} : server)
  .listen(PORT, () => console.log('Server listening on port:', PORT))
  .on('upgrade', initRoutes);

// https.createServer({
//   key: key,
//   cert: cert
// }, app).listen(443);