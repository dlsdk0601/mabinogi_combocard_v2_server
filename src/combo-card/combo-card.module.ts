import { Module } from '@nestjs/common';
import { ComboCardService } from './combo-card.service';
import { ComboCardController } from './combo-card.controller';

@Module({
  controllers: [ComboCardController],
  providers: [ComboCardService],
})
export class ComboCardModule {}
