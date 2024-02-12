import http from 'http';
import url from 'url';
import { loggerMiddleware } from './middleware';
import { routes } from './routes';
import { RequestTypeNode } from './types';

const PORT = process.env.PORT || 4000;

export const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url || '', true);
  const query = parsedUrl.query || '';
  const path = parsedUrl.pathname || '';
  const method = req.method?.toUpperCase() || '';

  let handler = routes[path] && routes[path][method];
  const _req: RequestTypeNode = req;

  // Dynamic handler
  if (!handler) {
    const routeDynamicKeys = Object.keys(routes).filter((key) =>
      key.includes(':'),
    );
    const matchedKey = routeDynamicKeys.find((key) => {
      // replacing each segment of the key that starts with a colon (:)
      const regex = new RegExp(`^${key.replace(/:[^/]+/g, '([^/]+)')}$`);
      return regex.test(path); // /api/users/:123 => /api/users/123
    });

    if (matchedKey) {
      // now we need to get paramteres (:id)
      const regex = new RegExp(`^${matchedKey.replace(/:[^/]+/g, '([^/]+)')}$`);

      const dynamicParams = regex.exec(path)?.slice(1);

      const paramKeys = matchedKey
        ?.match(/:[^/]+/g)
        ?.map((key) => key.substring(1));

      if (paramKeys) {
        const params = dynamicParams?.reduce(
          (acc, val, i) => ({ ...acc, [paramKeys[i]]: val }),
          {},
        );
        _req.params = params;
      }

      handler = routes[matchedKey][method];
    }
  }

  if (!handler) {
    handler = routes.notFound.resp;
  }

  _req.query = {};
  for (const key in query) {
    _req.query[key] = query[key];
  }

  handler(_req, res);
});

server.on('request', loggerMiddleware);

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
