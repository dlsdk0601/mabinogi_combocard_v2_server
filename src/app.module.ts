import { Module } from "@nestjs/common";
import { ComboCardModule } from "./combo-card/combo-card.module";
import { AssetModule } from "./asset/asset.module";
import { MainController } from "./main.controller";
import { ManagerModule } from "./manager/manager.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./middleware/auth.guard";

@Module({
  imports: [ComboCardModule, AssetModule, ManagerModule],
  controllers: [MainController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
