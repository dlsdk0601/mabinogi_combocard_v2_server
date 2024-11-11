import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { json, urlencoded } from "express";
import { setupSwagger } from "./lib/swagger";
import { config } from "./config";
import { ResponseInterceptor } from "./middleware/interceptor";
import { HttpExceptionFilter } from "./middleware/filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors 활성
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  // 모든 request 에 validation 활성화
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //  페이로드와 DTO 클래스를 비교해 수신해서는 안되는 속성을 자동으로 제거하는 옵션(유효성이 검사된 객체만 수신)
      transform: true, // 네트워크를 통해 받는 페이로드가 DTO 클래스에 따라 지정된 개체로 자동 변환되도록 하는 옵션
      forbidNonWhitelisted: true, // 허용하지 않은 속성을 제거하는 대신 예외를 throw 하는 옵션
    })
  );

  // entity 용량 키우기
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ limit: "50mb", extended: true }));

  // api path prefix
  app.setGlobalPrefix(config.apiPrefix);

  // 에러 처리도 성공 케이스와 똑같은 response 형태를 나타나게 한다.
  // TODO :: 공통 처리가 안되는데 확인
  app.useGlobalFilters(new HttpExceptionFilter());

  // api response 형태를 공통으로 적용하기 위해 interceptor 추가
  app.useGlobalInterceptors(new ResponseInterceptor());

  // swagger 셋팅 (일반 회사에서 많이 쓰는 툴이므로 설치 해본다)
  await setupSwagger(app);

  // 환경 변수로 셋팅된 port 번호로 실행
  await app.listen(config.port);
}

// global await 를 사용 할 수 있으나 node 버전을 더 올려야 함으로 굳이 올리지 않고 then 으로 처리
bootstrap().then(() => {
  console.log("::::::::: server start :::::::::");
  console.log(`::::::::: port: ${config.port} :::::::::`);
});
