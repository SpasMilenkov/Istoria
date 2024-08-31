import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';

@Injectable()
export class WeaponService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createWeaponDto: CreateWeaponDto) {
    const { baseAttack, ...itemData } = createWeaponDto;

    return this.databaseService.weapon.create({
      data: {
        baseAttack,
        item: {
          create: {
            ...itemData,
            type: 'WEAPON', // Set the type discriminator
          },
        },
      },
      include: { item: true },
    });
  }

  async findAll() {
    return this.databaseService.weapon.findMany({
      include: { item: true },
    });
  }

  async findOne(id: string) {
    return this.databaseService.weapon.findUnique({
      where: { id },
      include: { item: true },
    });
  }

  async update(id: string, updateWeaponDto: UpdateWeaponDto) {
    const { baseAttack, ...itemData } = updateWeaponDto;

    return this.databaseService.weapon.update({
      where: { id },
      data: {
        baseAttack,
        item: {
          update: itemData,
        },
      },
      include: { item: true },
    });
  }

  async remove(id: string) {
    // First, delete the Weapon
    await this.databaseService.weapon.delete({
      where: { id },
    });

    // Then, delete the associated Item
    return this.databaseService.item.delete({
      where: { id },
    });
  }
}
