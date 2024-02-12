import http from 'http';
import url from 'url';
import { loggerMiddleware } from './middleware';
import { routes } from './routes';

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url || '', true);
  const query = parsedUrl.query || '';
  const path = parsedUrl.pathname || '';
  const method = req.method?.toUpperCase() || '';

  let handler = routes[path] && routes[path][method];

  if (!handler) {
    handler = routes.notFound.resp;
  }

  // req.query = {};
  // for (const key in query) {
  //   req.query[key] = query[key];
  // }

  handler(req, res);
});

server.on('request', loggerMiddleware);

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
