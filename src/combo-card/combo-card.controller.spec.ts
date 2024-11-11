import { Test, TestingModule } from '@nestjs/testing';
import { ComboCardController } from './combo-card.controller';
import { ComboCardService } from './combo-card.service';

describe('ComboCardController', () => {
  let controller: ComboCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComboCardController],
      providers: [ComboCardService],
    }).compile();

    controller = module.get<ComboCardController>(ComboCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
