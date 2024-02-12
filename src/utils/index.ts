import { RequestTypeNode, ResponseTypeNode, User } from '../types';

type ResponseOptions = {
  status: number;
  data: { message?: string; users?: User[]; user?: User };
};

export function response(res: ResponseTypeNode, options: ResponseOptions) {
  console.log('RESPONSE RUN', options.status);
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

// mock async action
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

//validate UUID
export const isUUID = (id: string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id,
  );
};
