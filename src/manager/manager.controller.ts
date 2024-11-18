import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { ManagerService } from "./manager.service";
import { ApiBearerAuth, ApiCreatedResponse } from "@nestjs/swagger";
import {
  AuthReqDto,
  AuthResDto,
  SignInReqDto,
  SignInResDto,
  TokenRefreshResDto,
} from "./dto/manager.dto";
import { Request, Response } from "express";
import { CONSTANT } from "../constant";

@Controller("/admin/manager")
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post("/sign-in")
  @ApiCreatedResponse({ type: SignInResDto })
  signIn(@Body() req: SignInReqDto, @Res() res: Response) {
    return this.managerService.signIn(req, res);
  }

  @Post("/auth")
  @ApiBearerAuth("authorization")
  @ApiCreatedResponse({ type: AuthResDto })
  auth(@Req() req: Request, @Body() _: AuthReqDto) {
    const pk = req.manager.sub;
    return this.managerService.auth(pk);
  }

  @Post("/token-refresh")
  @ApiBearerAuth("refresh-token")
  @ApiCreatedResponse({ type: TokenRefreshResDto })
  tokenRefresh(@Req() req: Request) {
    const payload: string | null = req.cookies[CONSTANT.REFRESH_TOKEN_COOKIE_KEY] ?? null;
    return this.managerService.tokenRefresh(payload);
  }
}
