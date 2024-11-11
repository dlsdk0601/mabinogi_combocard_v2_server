import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ComboCardListResItemDto {
  @ApiProperty({ description: "primary key", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "카드 이름", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "카드 영문", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  englishName: string;

  @ApiProperty({ description: "카드 이미지 경로", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  path: string;
}

@ApiExtraModels(ComboCardListResItemDto)
export class ComboCardListResDto {
  @ApiProperty({
    description: "콤보 카드 리스트",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(ComboCardListResItemDto) },
  })
  @IsArray()
  @IsNotEmpty()
  comboCards: ComboCardListResItemDto[];
}
