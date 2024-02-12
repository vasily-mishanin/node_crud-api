import { RequestTypeNode, ResponseTypeNode, User } from '../types';

type ResponseOptions = {
  status: number;
  data: { message?: string; users?: User[]; user?: User };
};

export function response(res: ResponseTypeNode, options: ResponseOptions) {
  console.log('RESPONSE RUN');
  res.statusCode = options.status;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(options.data));
  res.end();
}

// Returns a promise that resolves with the parsed JSON data of the request body.
export const getPostBodyAsync = (req: RequestTypeNode) => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        body = body ? JSON.parse(body) : {};

        resolve(body);
      } catch (error) {
        reject(error);
      }
    });
  });
};
