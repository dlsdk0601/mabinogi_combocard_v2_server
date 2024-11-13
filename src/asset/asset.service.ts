import { Injectable, NotFoundException } from "@nestjs/common";
import { db } from "../db/db";
import { Response } from "express";
import * as fs from "node:fs";
import * as path from "node:path";

@Injectable()
export class AssetService {
  findOne(filename: string, res: Response) {
    const filePath = this.getImagePath(filename);

    if (!fs.existsSync(filePath)) {
      console.error(`:::::: File not found filename=${filename}::::::`);
      throw new NotFoundException("이미지가 조회되지 않습니다.");
    }

    return res.sendFile(filePath);
  }

  download(filename: string, res: Response) {
    const filePath = this.getImagePath(filename);

    if (!fs.existsSync(filePath)) {
      console.error(`:::::: File not found filename=${filename} ::::::`);
      return new NotFoundException("이미지가 조회되지 않습니다.");
    }

    const file = fs.createReadStream(filePath);

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    file.pipe(res);
  }

  // 이미지도 aws 에 올리는게 좋으나 아직 DB 도 없고 어드민도 없어서 static 파일을 그냥 보낸다.
  getImagePath(filename: string) {
    return path.join(process.cwd(), "src", "db", "images", filename);
  }
}
