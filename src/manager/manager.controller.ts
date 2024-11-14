import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { ManagerService } from "./manager.service";
import { ApiBearerAuth, ApiCreatedResponse } from "@nestjs/swagger";
import { AuthResDto, SignInReqDto, SignInResDto } from "./dto/manager.dto";
import { Request, Response } from "express";

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
  auth(@Req() req: Request) {
    const pk = req.manager.sub;
    return this.managerService.auth(pk);
  }
}
