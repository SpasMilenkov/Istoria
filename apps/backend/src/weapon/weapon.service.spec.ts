import { Test, TestingModule } from '@nestjs/testing';
import { WeaponService } from './weapon.service';
import { DatabaseModule } from '../database/database.module';

describe('WeaponService', () => {
  let service: WeaponService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeaponService],
      imports: [DatabaseModule],
    }).compile();

    service = module.get<WeaponService>(WeaponService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
