import { Module } from "@nestjs/common";
import { ComboCardModule } from "./combo-card/combo-card.module";
import { AssetModule } from "./asset/asset.module";

@Module({
  imports: [ComboCardModule, AssetModule],
  providers: [],
})
export class AppModule {}
