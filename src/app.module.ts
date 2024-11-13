import { Module } from "@nestjs/common";
import { ComboCardModule } from "./combo-card/combo-card.module";
import { AssetModule } from "./asset/asset.module";
import { MainController } from "./main.controller";
import { ManagerModule } from "./manager/manager.module";

@Module({
  imports: [ComboCardModule, AssetModule, ManagerModule],
  controllers: [MainController],
  providers: [],
})
export class AppModule {}
