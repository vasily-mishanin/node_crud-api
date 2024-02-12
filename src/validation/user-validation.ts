import { ObjectNewUser, RequestTypeNode, ResponseTypeNode } from '../types';
import { getPostBodyAsync } from '../utils';
import { response } from '../utils';

// Middleware function to validate user data in a POST request.
export const validateUserData = async (
  req: RequestTypeNode,
  res: ResponseTypeNode,
  nextCallback: Function,
) => {
  try {
    const body = await getPostBodyAsync(req);
    const method = req.method?.toUpperCase();
    const userKeys = ['username', 'age', 'hobbies'];
    const bodyKeys = Object.keys(body as Object);
    if (
      method === 'PUT' &&
      bodyKeys.some((key) => userKeys.some((k) => k === key))
    ) {
      nextCallback(req, res, body);
      return;
    }

    const user = ObjectNewUser(body); // typeguard for incoming data

    nextCallback(req, res, user);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      response(res, { status: 400, data: { message: error.message } });
    } else {
      response(res, {
        status: 400,
        data: { message: 'User data validation error - check fields' },
      });
    }
  }
};
