import { User } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class UsersDB {
  private usersData!: User[];
  private static _instance: any;

  constructor() {
    if (UsersDB._instance) {
      return UsersDB._instance;
    }
    this.usersData = [
      { id: 'abc', username: 'Alex', age: 33, hobbies: ['hiking', 'drinking'] },
    ];
    UsersDB._instance = this;
  }

  static getInstance() {
    return this._instance;
  }

  get users() {
    return this.usersData;
  }

  getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  addNewUser(user: Omit<User, 'id'>) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userId = uuidv4();
        if (this.users.findIndex((user) => user.id === userId) > -1) {
          reject('Error in DB when creating new user');
          throw Error('Error in DB when creating new user');
        }
        this.users.push({ id: userId, ...user });
        resolve(true);
      }, 1000);
    });
  }
}
