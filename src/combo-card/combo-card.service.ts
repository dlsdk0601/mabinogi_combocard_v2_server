import { Injectable, NotFoundException } from "@nestjs/common";
import { db } from "../db/db";

@Injectable()
export class ComboCardService {
  findAll() {
    return db.combocards;
  }

  findOne(pk: number) {
    const card = db.combocards.find((card) => card.pk === pk);

    if (!card) {
      return new NotFoundException("콤보 카드 데이터가 조회되지 않습니다.");
    }

    return card;
  }
}
