import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupSwagger = async (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle("mabinogi-combocard-swagger")
    .setDescription("마비노기 콤보카드 API 스웨거")
    .setVersion("1")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/swagger", app, document);
};
