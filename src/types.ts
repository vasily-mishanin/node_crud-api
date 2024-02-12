import http from 'http';

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type ResponseTypeNode = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};

export type RequestTypeNode = {
  params?: Record<string, string>;
  query?: Record<string, string | string[] | undefined>;
} & http.IncomingMessage;

//// Type Guards for runtime
type TypeGuard<T> = (val: unknown) => T;

const stringGuard: TypeGuard<string> = (val: unknown) => {
  if (typeof val !== 'string') throw new Error(`${val} is not of type string`);
  return val;
};

// const stringsArrayGuard: TypeGuard<string[]> = (val: unknown) => {
//   if (Array.isArray(val) && val.every((el) => typeof el === 'string'))
//     return val;
//   throw new Error(`${val} is not of type string []`);
// };

const numberGuard: TypeGuard<number> = (val: unknown) => {
  if (typeof val !== 'number') throw new Error(`${val} is not of type number`);
  return val;
};

const object = <T extends Record<string, TypeGuard<any>>>(inner: T) => {
  return (val: unknown): { [P in keyof T]: ReturnType<T[P]> } => {
    if (val === null || typeof val !== 'object')
      throw new Error(`${val} is not  of type ${typeof inner}`);

    const out: { [P in keyof T]: ReturnType<T[P]> } = {} as any;

    for (const k in inner) {
      out[k] = inner[k]((val as any)[k]);
    }

    return out;
  };
};

const array =
  <T>(inner: TypeGuard<T>) =>
  (val: unknown): T[] => {
    if (!Array.isArray(val))
      throw new Error(`${val} is not of type ${typeof inner}`);
    return val.map(inner);
  };

export const ObjectUser = object({
  id: stringGuard,
  username: stringGuard,
  age: numberGuard,
  hobbies: array(stringGuard),
});

export const ObjectNewUser = object({
  username: stringGuard,
  age: numberGuard,
  hobbies: array(stringGuard),
});

export const ArrayOfUsers = array(ObjectUser);
