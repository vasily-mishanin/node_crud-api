import { RequestTypeNode, ResponseTypeNode } from '../types';
import { response } from '../utils';
import http from 'http';
import * as userController from '../controllers/user-controller';
import { validateUserData } from '../validation/user-validation';

export type RoutesType = {
  [path: string]: {
    [method: string]: (_req: RequestTypeNode, res: ResponseTypeNode) => void;
  };
};

export const routes: RoutesType = {
  '/': {
    GET: (_req: RequestTypeNode, res: ResponseTypeNode) => {
      response(res, {
        status: 200,
        data: { message: 'To run Node.js CRUD API path to /api' },
      });
    },
  },

  '/api': {
    GET: (_req: RequestTypeNode, res: ResponseTypeNode) => {
      response(res, {
        status: 200,
        data: { message: 'Running Node.js CRUD API' },
      });
    },
  },

  '/api/users': {
    GET: userController.getUsers,
    POST: (req: RequestTypeNode, res: ResponseTypeNode) =>
      validateUserData(req, res, userController.createUser),
  },

  '/api/users/:id': {
    GET: userController.getUserById,
    PUT: (req: RequestTypeNode, res: ResponseTypeNode) =>
      validateUserData(req, res, userController.updateUser),
  },

  notFound: {
    resp: (_req: http.IncomingMessage, res: ResponseTypeNode) => {
      response(res, {
        status: 404,
        data: { message: 'Requested resource not found!' },
      });
    },
  },
};
