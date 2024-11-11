import * as process from "node:process";

// 환경 변수 설정
// node 환경에서 process 가 안먹을 수도 있는데 그때는 ConfigService 를 사용
class Config {
  readonly port = process.env.port ?? "8080";
  readonly version = process.env.version ?? "1.0";

  readonly apiPrefix = "/api";
}

export const config = new Config();
