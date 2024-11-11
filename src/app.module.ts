import { Module } from "@nestjs/common";
import { ComboCardModule } from './combo-card/combo-card.module';

@Module({
  imports: [ComboCardModule],
  providers: [],
})
export class AppModule {}
