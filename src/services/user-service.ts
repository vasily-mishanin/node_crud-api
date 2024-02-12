import { UsersDB } from '../db/db';
import { PartialUser, User } from '../types';

const db = new UsersDB();

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = db.users;
      resolve(users);
    }, 1000);
  });
};

export const addUser = async (user: Omit<User, 'id'>) => {
  const createdUser = await db.addNewUser(user);
  return createdUser;
};

export const getOneUser = async (id: string) => {
  const createdUser = await db.getUserById(id);
  return createdUser;
};

export const updateUser = async (user: PartialUser) => {
  const updatedUser = await db.updateUser(user);
  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const deletedUser = await db.deleteUserById(id);
  return deletedUser;
};
