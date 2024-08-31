import { Test, TestingModule } from '@nestjs/testing';
import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';
import { DatabaseModule } from '../database/database.module';

describe('WeaponController', () => {
  let controller: WeaponController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponController],
      providers: [WeaponService],
      imports: [DatabaseModule],
    }).compile();

    controller = module.get<WeaponController>(WeaponController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
