import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { config } from "../config";

export interface GlobalManager {
  sub: number;
  name: string;
  id: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly HEADER_TYPE = "Bearer";

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("로그인을 해주세요.");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: config.jwtSecretKey });
      request["manager"] = payload;
    } catch {
      throw new UnauthorizedException("로그인을 다시 시도해주세요.");
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === this.HEADER_TYPE ? token : null;
  }
}
