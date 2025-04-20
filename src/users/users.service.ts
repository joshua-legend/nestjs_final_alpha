import { Injectable } from '@nestjs/common';

type User = {
  id: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private user: User = {
    id: 1,
    username: 'test',
    password: 'test1234',
  };

  findOne(username: string): User | undefined {
    if (this.user.username === username) {
      return this.user;
    }
    return undefined;
  }
}
