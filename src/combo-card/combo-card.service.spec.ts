import { Test, TestingModule } from '@nestjs/testing';
import { ComboCardService } from './combo-card.service';

describe('ComboCardService', () => {
  let service: ComboCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComboCardService],
    }).compile();

    service = module.get<ComboCardService>(ComboCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
