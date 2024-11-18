import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SignInReqDto {
  @ApiProperty({ description: "id", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "password", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInResDto {
  @ApiProperty({ description: "JWT", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}

export class AuthReqDto {}

export class AuthResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "id", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "이름", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(pk: number, id: string, name: string) {
    this.pk = pk;
    this.id = id;
    this.name = name;
  }
}

export class TokenRefreshReqDto {}

export class TokenRefreshResDto {
  @ApiProperty({ description: "JWT", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
