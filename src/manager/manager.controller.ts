import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ManagerService } from "./manager.service";
import { ApiBearerAuth, ApiCreatedResponse } from "@nestjs/swagger";
import { SignInReqDto, SignInResDto } from "./dto/manager.dto";
import { AuthGuard, GlobalManager } from "../lib/auth.guard";
import { Request } from "express";

@Controller("/admin/manager")
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post("/sign-in")
  @ApiCreatedResponse({ type: SignInResDto })
  signIn(@Body() req: SignInReqDto) {
    return this.managerService.signIn(req);
  }

  @Post("/auth")
  @UseGuards(AuthGuard)
  @ApiBearerAuth("authorization")
  auth(@Req() req: Request & { manager: GlobalManager }) {
    const pk = req.manager.sub;
    return this.managerService.auth(pk);
  }
}
