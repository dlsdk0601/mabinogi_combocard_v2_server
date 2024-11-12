import { Module } from "@nestjs/common";
import { ComboCardModule } from "./combo-card/combo-card.module";
import { AssetModule } from "./asset/asset.module";
import { MainController } from "./main.controller";

@Module({
  imports: [ComboCardModule, AssetModule],
  controllers: [MainController],
  providers: [],
})
export class AppModule {}
