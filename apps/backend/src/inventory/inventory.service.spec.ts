import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { DatabaseModule } from '../database/database.module';
import { WeaponModule } from '../weapon/weapon.module';
import { ArmorModule } from '../armor/armor.module';

describe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryService],
      imports: [DatabaseModule, WeaponModule, ArmorModule],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
