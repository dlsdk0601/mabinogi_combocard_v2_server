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
    const refreshToken = this.extractRefreshTokenFromCookie(request);

    // token 이 없다면 로그인 에러
    if (!token) {
      throw new UnauthorizedException("로그인을 해주세요.", { cause: API_STATUS.REQUIRED_SIGN_IN });
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: config.jwtSecretKey });
      request["manager"] = payload;
    } catch (e) {
      // 여기로 넘어왔다는건 verifyAsync 에서 에러가 났다는거
      // 사실 토큰 만료외의 에러는 개발기에서 추측하기 애매해서 일단 재로그인을 시도한다.
      if (e.name !== "TokenExpiredError") {
        console.log(`:::::: TOKEN VERIFY FAIL: ${e.toString()} ::::::`);
        throw new UnauthorizedException("로그인을 다시 시도해주세요.", {
          cause: API_STATUS.REQUIRED_SIGN_IN,
        });
      }

      // 토큰 만료인데, refreshToken 도 없다 => 재로그인
      if (!refreshToken) {
        throw new UnauthorizedException("로그인을 다시 시도해주세요.", {
          cause: API_STATUS.REQUIRED_SIGN_IN,
        });
      }

      // 토큰 만료인데, refreshToken 은 있다 => 검증
      try {
        const refreshPayload = await this.jwtService.verifyAsync(refreshToken, {
          secret: config.jwtSecretKey,
        });

        if (refreshPayload) {
          // 검증 성공 => client 단에서 토큰 재발급을 요청하라고 에러를 던져준다.
          throw new UnauthorizedException("로그인을 다시 시도해주세요.", {
            cause: API_STATUS.TOKEN_EXPIRED,
          });
        }
      } catch (refreshTokenErr) {
        // refresh-token 검증 실패 => 로그인 재시도
        console.error(`:::::: REFRESH TOKEN VERIFY FAIL: ${refreshTokenErr.toString()} :::::::`);
        throw new UnauthorizedException("로그인을 다시 시도해주세요.", {
          cause: API_STATUS.REQUIRED_SIGN_IN,
        });
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === this.HEADER_TYPE ? token : null;
  }

  private extractRefreshTokenFromCookie(request: Request): string | null {
    return request.cookies[CONSTANT.REFRESH_TOKEN_COOKIE_KEY] ?? null;
  }
}
