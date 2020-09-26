import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxy({});

export const initRoutes = (req: any, res: any) => {
  const available = ['/home'];
  if (available.indexOf(req.url) >= 0) {
    proxy.web(req, res, { target: 'http://127.0.0.1:5050' });  
  } else {
    res.send({"error": "URL not found"})
  }
}