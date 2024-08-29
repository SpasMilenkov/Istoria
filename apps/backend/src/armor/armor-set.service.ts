import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateArmorSetDto } from './dto/create-armor-set.dto';
import { UpdateArmorSetDto } from './dto/update-armor-set.dto';

@Injectable()
export class ArmorSetService {
  constructor(private prisma: DatabaseService) {}

  async create(createArmorSetDto: CreateArmorSetDto) {
    const { name, setBonus, buffs, debuffs } = createArmorSetDto;
    return this.prisma.armorSet.create({
      data: {
        name,
        SetBonus: { connect: setBonus?.map((id) => ({ id })) },
        Buffs: { connect: buffs?.map((id) => ({ id })) },
        Debuffs: { connect: debuffs?.map((id) => ({ id })) },
      },
      include: { SetBonus: true, Buffs: true, Debuffs: true, Armor: true },
    });
  }

  async findAll() {
    return this.prisma.armorSet.findMany({
      include: { SetBonus: true, Buffs: true, Debuffs: true, Armor: true },
    });
  }

  async findOne(id: string) {
    const armorSet = await this.prisma.armorSet.findUnique({
      where: { id },
      include: { SetBonus: true, Buffs: true, Debuffs: true, Armor: true },
    });

    if (!armorSet) {
      throw new NotFoundException(`Armor Set with ID ${id} not found`);
    }

    return armorSet;
  }

  async update(id: string, updateArmorSetDto: UpdateArmorSetDto) {
    const { name, setBonus, buffs, debuffs } = updateArmorSetDto;

    const existingArmorSet = await this.prisma.armorSet.findUnique({
      where: { id },
    });
    if (!existingArmorSet) {
      throw new NotFoundException(`Armor Set with ID ${id} not found`);
    }

    return this.prisma.armorSet.update({
      where: { id },
      data: {
        name,
        SetBonus: { set: setBonus?.map((id) => ({ id })) },
        Buffs: { set: buffs?.map((id) => ({ id })) },
        Debuffs: { set: debuffs?.map((id) => ({ id })) },
      },
      include: { SetBonus: true, Buffs: true, Debuffs: true, Armor: true },
    });
  }

  async remove(id: string) {
    const existingArmorSet = await this.prisma.armorSet.findUnique({
      where: { id },
    });
    if (!existingArmorSet) {
      throw new NotFoundException(`Armor Set with ID ${id} not found`);
    }

    return this.prisma.armorSet.delete({
      where: { id },
      include: { SetBonus: true, Buffs: true, Debuffs: true, Armor: true },
    });
  }
}
