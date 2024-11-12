import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("/")
@ApiTags("health-check")
export class MainController {
  constructor() {}

  @Get("/common/health-check")
  healthCheck() {
    const now = new Date();

    return `:::::: server check timestamp: ${now.toISOString()} ::::::`;
  }
}
