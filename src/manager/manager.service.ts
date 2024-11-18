import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthResDto, SignInReqDto, SignInResDto, TokenRefreshResDto } from "./dto/manager.dto";
import { db, Manager } from "../db/db";
import { JwtService } from "@nestjs/jwt";
import { config } from "src/config";
import { Response } from "express";
import { CONSTANT } from "../constant";
import { API_STATUS } from "../middleware/interceptor";
import { GlobalManager } from "../middleware/auth.guard";

@Injectable()
export class ManagerService {
  constructor(private jwtService: JwtService) {}

  async signIn(req: SignInReqDto, res: Response) {
    const manager = db.managers.find((manager) => manager.id === req.id);

    if (!manager) {
      throw new NotFoundException("회원이 조회되지 않습니다.", { cause: API_STATUS.NOT_FOUND });
    }

    // 비밀번호는 암호화 하는게 맞으나, 여기서는 하지 않고 DB 가 설립된다면 진행
    if (manager.password !== req.password) {
      throw new BadRequestException("비밀전호가 일치하지 않습니다.", {
        cause: API_STATUS.BAD_REQUEST,
      });
    }

    const payload = this.getPayload(manager);
    const token = await this.getToken(manager);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: config.jwtSecretKey,
      expiresIn: CONSTANT.REFRESH_TOKEN_EXPIRES_IN,
    });

    res.cookie(CONSTANT.REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: CONSTANT.THREE_DAY_SECONDS,
    });

    return new SignInResDto(token);
  }

  auth(pk: number) {
    const manager = db.managers.find((manager) => manager.pk === pk);

    if (!manager) {
      throw new NotFoundException("회원이 조회되지 않습니다.", { cause: API_STATUS.NOT_FOUND });
    }

    return new AuthResDto(manager.pk, manager.id, manager.name);
  }

  async tokenRefresh(refreshToken: string | null) {
    if (!refreshToken) {
      throw new BadRequestException("로그인을 다시 시도해주세요.", {
        cause: API_STATUS.BAD_REQUEST,
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync<GlobalManager>(refreshToken, {
        secret: config.jwtSecretKey,
      });

      const manager = db.managers.find((m) => m.pk === payload.sub);

      if (!manager) {
        return new NotFoundException("회원이 조회되지 않습니다.", { cause: API_STATUS.NOT_FOUND });
      }

      const token = await this.getToken(manager);

      return new TokenRefreshResDto(token);
    } catch (e) {
      console.error(`:::::: ${e.toString()} ::::::`);
      throw new UnauthorizedException(e, { cause: API_STATUS.TOKEN_EXPIRED });
    }
  }

  getPayload(manager: Manager): GlobalManager {
    return { sub: manager.pk, id: manager.id, name: manager.name };
  }

  async getToken(manager: Manager) {
    const payload = this.getPayload(manager);
    return this.jwtService.signAsync(payload);
  }
}
