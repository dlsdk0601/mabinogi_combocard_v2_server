import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthResDto, SignInReqDto, SignInResDto } from "./dto/manager.dto";
import { db } from "../db/db";
import { JwtService } from "@nestjs/jwt";
import { config } from "src/config";
import { Response } from "express";
import { CONSTANT } from "../constant";
import { API_STATUS } from "../middleware/interceptor";

@Injectable()
export class ManagerService {
  constructor(private jwtService: JwtService) {}

  async signIn(req: SignInReqDto) {
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

    const payload = { sub: manager.pk, id: manager.id, name: manager.name };
    const token = await this.jwtService.signAsync(payload);

    return new SignInResDto(token);
  }

  auth(pk: number) {
    const manager = db.managers.find((manager) => manager.pk === pk);

    if (!manager) {
      throw new NotFoundException("회원이 조회되지 않습니다.", { cause: API_STATUS.NOT_FOUND });
    }

    return new AuthResDto(manager.pk, manager.id, manager.name);
  }
}
