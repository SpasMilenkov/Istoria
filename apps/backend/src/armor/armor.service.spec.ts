import { Test, TestingModule } from '@nestjs/testing';
import { ArmorService } from './armor.service';

describe('ArmorService', () => {
  let service: ArmorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmorService],
    }).compile();

    service = module.get<ArmorService>(ArmorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
