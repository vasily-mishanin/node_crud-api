import {
  ArrayOfUsers,
  RequestTypeNode,
  ResponseTypeNode,
  User,
} from '../types';
import { response } from '../utils';
import * as userService from '../services/user-service';

export const getUsers = async (req: RequestTypeNode, res: ResponseTypeNode) => {
  try {
    const users: User[] = ArrayOfUsers(await userService.getUsers());
    response(res, { status: 200, data: { users } });
  } catch (error) {
    console.log('Error while getting users', error);
  }
};

export const createUser = async (
  req: RequestTypeNode,
  res: ResponseTypeNode,
  user: Omit<User, 'id'>,
) => {
  try {
    const createdUser = await userService.addUser(user);
    if (createdUser) {
      response(res, { status: 201, data: { user: createdUser } });
    } else {
      response(res, {
        status: 400,
        data: { message: 'Error while creating user' },
      });
    }
  } catch (error) {
    console.log('Error while creating user', error);
  }
};

export const getUserById = async (
  req: RequestTypeNode,
  res: ResponseTypeNode,
) => {
  const userId = req.params?.id;
  try {
    if (userId) {
      const user = await userService.getOneUser(userId);
      if (user) {
        response(res, { status: 200, data: { user } });
      } else {
        response(res, {
          status: 404,
          data: { message: `User with id ${userId} NOT FOUND` },
        });
      }
    } else {
      response(res, {
        status: 400,
        data: { message: 'Invalid user id' },
      });
    }
  } catch (error) {
    console.log(`Error while getting on user with id: ${userId}`, error);
  }
};
