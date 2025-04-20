import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

type User = {
  id: number;
  username: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
