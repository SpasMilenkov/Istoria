import { Test, TestingModule } from '@nestjs/testing';
import { ArmorService } from './armor.service';
import { ArmorSetService } from './armor-set.service';
import { DatabaseModule } from '../database/database.module';

describe('ArmorService', () => {
  let service: ArmorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmorService, ArmorSetService],
      imports: [DatabaseModule],
    }).compile();

    service = module.get<ArmorService>(ArmorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
