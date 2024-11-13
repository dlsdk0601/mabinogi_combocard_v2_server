import { Module } from "@nestjs/common";
import { ManagerService } from "./manager.service";
import { ManagerController } from "./manager.controller";
import { JwtModule } from "@nestjs/jwt";
import { config } from "../config";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.jwtSecretKey,
      signOptions: { expiresIn: "60h" },
    }),
  ],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
