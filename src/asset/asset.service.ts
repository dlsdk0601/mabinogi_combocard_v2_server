import { Injectable, NotFoundException } from "@nestjs/common";
import { db } from "../db/db";
import { Response } from "express";
import * as fs from "node:fs";

@Injectable()
export class AssetService {
  findOne(filename: string, res: Response) {
    const filePath = db.getImagePath(filename);

    if (!fs.existsSync(filePath)) {
      console.error(`:::::: File not found filename=${filename}::::::`);
      throw new NotFoundException("이미지가 조회되지 않습니다.");
    }

    return res.sendFile(filePath);
  }

  download(filename: string, res: Response) {
    const filePath = db.getImagePath(filename);

    if (!fs.existsSync(filePath)) {
      console.error(`:::::: File not found filename=${filename} ::::::`);
      return new NotFoundException("이미지가 조회되지 않습니다.");
    }

    const file = fs.createReadStream(filePath);

    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    file.pipe(res);
  }
}
