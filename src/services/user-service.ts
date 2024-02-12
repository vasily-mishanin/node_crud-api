import { UsersDB } from '../db/db';
import { User } from '../types';

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
  const user = await db.getUserById(id);
  return user;
};
