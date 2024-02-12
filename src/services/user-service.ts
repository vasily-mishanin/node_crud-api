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
  await db.addNewUser(user);
};
