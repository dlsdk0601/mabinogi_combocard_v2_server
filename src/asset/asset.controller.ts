import { Controller, Get, Param, Res } from "@nestjs/common";
import { AssetService } from "./asset.service";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@Controller("/asset")
@ApiTags("이미지")
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get("/:filename")
  findOne(@Param("filename") filename: string, @Res() res: Response) {
    return this.assetService.findOne(filename, res);
  }

  @Get("/download/:filename")
  downloadController(@Param("filename") filename: string) {
    return this.assetService.download(filename);
  }

  // OPT :: 어드민을 만들게 되면 multer 를 이용해서 업로드 구현
  // OPT :: DB 를 만들게 되면 AWS 에 업로드
}
