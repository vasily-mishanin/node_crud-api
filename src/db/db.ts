import { User } from '../types';

export class UsersDB {
  private usersData: User[];

  constructor(users = []) {
    this.usersData = users;
  }

  get users() {
    return this.usersData;
  }

  getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }
}
