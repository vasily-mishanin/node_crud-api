import { ObjectUser, PartialUser, User } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { wait } from '../utils';
import { TIMEOUT_ms } from '../constants';

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

  set users(value: User[]) {
    this.usersData = value;
  }

  getUserById(id: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user: User | null;
        try {
          user = ObjectUser(this.users.find((user) => user.id === id));
          resolve(user);
        } catch (error) {
          resolve(null);
        }
      }, TIMEOUT_ms);
    });
  }

  addNewUser(user: Omit<User, 'id'>): Promise<User | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userId = uuidv4();
        if (this.users.findIndex((user) => user.id === userId) > -1) {
          resolve(null);
          throw Error('Error in DB when creating new user');
        }
        const newUser = { id: userId, ...user };
        this.users.push(newUser);
        resolve(newUser);
      }, TIMEOUT_ms);
    });
  }

  updateUser(userData: PartialUser): Promise<User | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = this.users.find((u) => u.id === userData.id);
        if (!existingUser) {
          resolve(null);
        } else {
          const updatedUser: User = { ...existingUser, ...userData };

          this.users = this.users.map((user) =>
            user.id === userData.id ? updatedUser : user,
          );
          resolve(updatedUser);
        }
      }, TIMEOUT_ms);
    });
  }
}
