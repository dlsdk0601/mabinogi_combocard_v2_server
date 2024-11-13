import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "src/config";

export const setupSwagger = async (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle("mabinogi-combocard-swagger")
    .setDescription("마비노기 콤보카드 API 스웨거")
    .addBearerAuth({ type: "http", scheme: "bearer", name: "JWT", in: "header" }, "authorization")
    .setVersion(config.version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/swagger", app, document);
};
