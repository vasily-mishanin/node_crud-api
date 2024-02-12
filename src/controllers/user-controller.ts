import {
  ArrayOfUsers,
  PartialUser,
  RequestTypeNode,
  ResponseTypeNode,
  User,
} from '../types';
import { isUUID, response } from '../utils';
import * as userService from '../services/user-service';

// GET all users
export const getUsers = async (req: RequestTypeNode, res: ResponseTypeNode) => {
  try {
    const users: User[] = ArrayOfUsers(await userService.getUsers());
    response(res, { status: 200, data: { users } });
  } catch (error) {
    console.log('Error while getting users', error);
  }
};

// POST user
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
        status: 500,
        data: { message: 'Error while creating user' },
      });
    }
  } catch (error) {
    console.log('Error while creating user', error);
  }
};

// GET one user
export const getUserById = async (
  req: RequestTypeNode,
  res: ResponseTypeNode,
) => {
  const userId = req.params?.id;
  if (!userId) {
    response(res, {
      status: 400,
      data: { message: 'No user ID provided' },
    });
    return;
  } else if (!isUUID(userId)) {
    response(res, {
      status: 400,
      data: { message: 'Provided user ID is not UUID' },
    });
    return;
  }

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

// PUT user
export const updateUser = async (
  req: RequestTypeNode,
  res: ResponseTypeNode,
  user: PartialUser,
) => {
  const userId = req.params?.id;
  if (!userId) {
    response(res, {
      status: 400,
      data: { message: 'No user ID provided' },
    });
    return;
  } else if (!isUUID(userId)) {
    response(res, {
      status: 400,
      data: { message: 'Provided user ID is not UUID' },
    });
    return;
  }

  user = { ...user, id: userId };

  try {
    const updatedUser = await userService.updateUser(user);
    if (updatedUser) {
      response(res, { status: 200, data: { user: updatedUser } });
    } else {
      response(res, {
        status: 404,
        data: { message: `User with id ${userId} NOT FOUND` },
      });
    }
  } catch (error) {
    console.log('Error while updating user', error);
  }
};

// DELETE user
export const deleteUserById = async (
  req: RequestTypeNode,
  res: ResponseTypeNode,
) => {
  const userId = req.params?.id;
  if (!userId) {
    response(res, {
      status: 400,
      data: { message: 'No user ID provided' },
    });
    return;
  } else if (!isUUID(userId)) {
    response(res, {
      status: 400,
      data: { message: 'Provided user ID is not UUID' },
    });
    return;
  }

  try {
    const user = await userService.deleteUser(userId);
    if (user) {
      response(res, {
        status: 204,
        data: { message: `User with id ${user.id} was deleted` },
      });
    } else {
      response(res, {
        status: 404,
        data: { message: `User with id ${userId} NOT FOUND` },
      });
    }
  } catch (error) {
    console.log(`Error while getting on user with id: ${userId}`, error);
  }
};
