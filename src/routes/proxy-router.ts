import httpProxy from 'http-proxy';
import routesController from '../database/routes';

const systemRoutes = [{
  url: '/'
}, {
  url: '/ui'
}];

const proxy = httpProxy.createProxy({ xfwd: true, ws: true });

proxy.on('error', (err, req, res) => {
  console.log(err);
  res.writeHead(503, "Service Unavailable");
  res.end();
});

export const initRoutes = (req: any, res: any) => {
  
  //Check if it is a system route
  if (systemRoutes.filter(route => route.url == req.url).length > 0)
    return;

  routesController.find().then(routes => {
    
    const availableRoutes = routes;
    const forwardRoute = availableRoutes.filter(route => route.url == req.url);
    if (forwardRoute.length > 0) {
      console.log("Redirecting from:", req.url, "to", forwardRoute[0].target);
      if (forwardRoute[0].ignoreBasePath) req.url = '';
      
      if (forwardRoute[0].webSocket)
        proxy.ws(req, res, { target: forwardRoute[0].target })
      else
        proxy.web(req, res, { target: forwardRoute[0].target, changeOrigin: true });
    } else {
      res.send({ "error": "Unknown route" })
    }
  })

}