import { Test, TestingModule } from '@nestjs/testing';
import { ArmorController } from './armor.controller';
import { ArmorService } from './armor.service';
import { Attribute, Rarity, Weight } from '@istoria/database';
import { CreateArmorDto } from './dto/create-armor.dto';
import { ArmorResponseDto } from './dto/get-armor.dto';
import { UpdateArmorDto } from './dto/update-armor.dto';

describe('ArmorController', () => {
  let controller: ArmorController;
  let service: ArmorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmorController],
      providers: [
        {
          provide: ArmorService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ArmorController>(ArmorController);
    service = module.get<ArmorService>(ArmorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an armor', async () => {
      const createArmorDto: CreateArmorDto = {
        name: 'Test Armor',
        attributes: [Attribute.LIGHT_ATTRIBUTE],
        rarity: Rarity.COMMON,
        defense: 10,
        speed: 5,
        agility: 5,
        requiredLevel: 1,
        origin: 'Test Kingdom',
        weight: Weight.LIGHT,
        armorSetId: '00000000-0000-0000-0000-000000000000',
        durability: 22,
      };

      const expectedResult: ArmorResponseDto = {
        id: '12345678-1234-1234-1234-123456789012',
        ...createArmorDto,
        itemId: '87654321-4321-4321-4321-210987654321',
        armorPiece: 'CHESTPLATE',
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      expect(await controller.create(createArmorDto)).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createArmorDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of armors', async () => {
      const expectedResult: ArmorResponseDto[] = [
        {
          id: '12345678-1234-1234-1234-123456789012',
          name: 'Test Armor 1',
          attributes: [Attribute.LIGHT_ATTRIBUTE],
          rarity: Rarity.COMMON,
          defense: 10,
          speed: 5,
          agility: 5,
          requiredLevel: 1,
          origin: 'Test Kingdom 1',
          weight: Weight.LIGHT,
          armorSetId: '00000000-0000-0000-0000-000000000001',
          itemId: '87654321-4321-4321-4321-210987654321',
          durability: 22,
          armorPiece: 'CHESTPLATE',
        },
        {
          id: '23456789-2345-2345-2345-234567890123',
          name: 'Test Armor 2',
          attributes: [Attribute.DARK_ATTRIBUTE],
          rarity: Rarity.RARE,
          defense: 20,
          speed: 3,
          agility: 3,
          requiredLevel: 5,
          origin: 'Test Kingdom 2',
          weight: Weight.HEAVY,
          armorSetId: '00000000-0000-0000-0000-000000000002',
          itemId: '76543210-3210-3210-3210-109876543210',
          durability: 22,
          armorPiece: 'GREAVES',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      expect(await controller.findAll()).toBe(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single armor', async () => {
      const expectedResult: ArmorResponseDto = {
        id: '12345678-1234-1234-1234-123456789012',
        name: 'Test Armor',
        attributes: [Attribute.LIGHT_ATTRIBUTE],
        rarity: Rarity.COMMON,
        defense: 10,
        speed: 5,
        agility: 5,
        requiredLevel: 1,
        origin: 'Test Kingdom',
        weight: Weight.LIGHT,
        armorSetId: '00000000-0000-0000-0000-000000000000',
        itemId: '87654321-4321-4321-4321-210987654321',
        durability: 22,
        armorPiece: 'CHESTPLATE',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      expect(
        await controller.findOne('12345678-1234-1234-1234-123456789012')
      ).toBe(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith({
        id: '12345678-1234-1234-1234-123456789012',
      });
    });
  });

  describe('update', () => {
    it('should update an armor', async () => {
      const updateArmorDto: UpdateArmorDto = {
        name: 'Updated Test Armor',
        defense: 15,
      };

      const expectedResult: ArmorResponseDto = {
        id: '12345678-1234-1234-1234-123456789012',
        name: 'Updated Test Armor',
        attributes: [Attribute.LIGHT_ATTRIBUTE],
        rarity: Rarity.COMMON,
        defense: 15,
        speed: 5,
        agility: 5,
        requiredLevel: 1,
        origin: 'Test Kingdom',
        weight: Weight.LIGHT,
        armorSetId: '00000000-0000-0000-0000-000000000000',
        itemId: '87654321-4321-4321-4321-210987654321',
        durability: 22,
        armorPiece: 'CHESTPLATE',
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

      expect(
        await controller.update(
          '12345678-1234-1234-1234-123456789012',
          updateArmorDto
        )
      ).toBe(expectedResult);
      expect(service.update).toHaveBeenCalledWith(
        '12345678-1234-1234-1234-123456789012',
        updateArmorDto
      );
    });
  });

  describe('remove', () => {
    it('should remove an armor', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(
        await controller.remove('12345678-1234-1234-1234-123456789012')
      ).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(
        '12345678-1234-1234-1234-123456789012'
      );
    });
  });
});
