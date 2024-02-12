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
    await userService.addUser(user);
    response(res, { status: 201, data: { user: { id: '123', ...user } } });
  } catch (error) {
    console.log('Error while creating user', error);
  }
};
