import { Controller, Get, Param } from "@nestjs/common";
import { ComboCardService } from "./combo-card.service";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { ComboCardListResDto } from "./dto/combo-card.dto";
import { Public } from "../middleware/auth.guard";

@Controller("/combo-card")
@ApiTags("콤보 카드 API")
export class ComboCardController {
  constructor(private readonly comboCardService: ComboCardService) {}

  @Get("/list")
  @Public()
  @ApiCreatedResponse({ type: ComboCardListResDto })
  findAll() {
    return this.comboCardService.findAll();
  }

  @Get("/:pk")
  @Public()
  findOne(@Param("pk") pk: number) {
    return this.comboCardService.findOne(pk);
  }
}
