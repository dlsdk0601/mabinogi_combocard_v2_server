import { Injectable, NotFoundException } from "@nestjs/common";
import { db } from "../db/db";
import { API_STATUS } from "../middleware/interceptor";

@Injectable()
export class ComboCardService {
  findAll() {
    return db.comboCards;
  }

  findOne(pk: number) {
    const card = db.comboCards.find((card) => card.pk === pk);

    if (!card) {
      console.error(`:::::: Card not found pk=${pk}::::::`);
      throw new NotFoundException("콤보 카드 데이터가 조회되지 않습니다.", {
        cause: API_STATUS.NOT_FOUND,
      });
    }

    return card;
  }
}
