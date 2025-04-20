import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // 로그인 엔드포인트는 인증 없이 접근 가능
    if (request.path === '/auth/login' && request.method === 'POST') {
      return true;
    }

    // /breads GET 요청은 인증 없이 접근 가능
    if (request.path === '/breads' && request.method === 'GET') {
      return true;
    }

    const authHeader = request.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    try {
      // 토큰 검증
      const payload = this.jwtService.verify(token);
      // 검증된 사용자 정보 페이로드를 req.user에 바인딩
      request.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
