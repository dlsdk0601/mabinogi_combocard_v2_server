import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { config } from "../config";
import { CONSTANT } from "../constant";
import { Reflector } from "@nestjs/core";
import { API_STATUS } from "./interceptor";

export interface GlobalManager {
  sub: number;
  name: string;
  id: string;
}

declare global {
  // namespace 를 되도록 지양하는게 맞으나, global 타입을 위해 여기서만 예외
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      manager: GlobalManager;
    }
  }
}

export const Public = () => SetMetadata(CONSTANT.IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly HEADER_TYPE = "Bearer";

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(CONSTANT.IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // public API 는 인증 제외 시킨다.
    if (isPublic) {
      return true;
    }

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
