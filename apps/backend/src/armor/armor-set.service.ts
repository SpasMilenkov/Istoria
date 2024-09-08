import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateArmorSetDto } from './dto/create-armor-set.dto';
import { UpdateArmorSetDto } from './dto/update-armor-set.dto';

/**
 * @description Service for managing armor sets.
 * Provides methods to create, retrieve, update, and delete armor sets.
 */
@Injectable()
export class ArmorSetService {
  /**
   * @param prisma - Service for interacting with the database.
   */
  constructor(private prisma: DatabaseService) {}

  /**
   * @description Creates a new armor set.
   * @param createArmorSetDto - Data Transfer Object containing information for the new armor set.
   * @returns The created armor set.
   */
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

  /**
   * @description Retrieves all armor sets.
   * @returns An array of armor sets.
   */
  async findAll() {
    return this.prisma.armorSet.findMany({
      include: { SetBonus: true, Buffs: true, Debuffs: true, Armor: true },
    });
  }

  /**
   * @description Retrieves a single armor set by its ID.
   * @param id - The ID of the armor set to retrieve.
   * @returns The requested armor set.
   * @throws {NotFoundException} If the armor set with the specified ID is not found.
   */
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

  /**
   * @description Updates an existing armor set.
   * @param id - The ID of the armor set to update.
   * @param updateArmorSetDto - Data Transfer Object containing updated information for the armor set.
   * @returns The updated armor set.
   * @throws {NotFoundException} If the armor set with the specified ID is not found.
   */
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

  /**
   * @description Removes an armor set by its ID.
   * @param id - The ID of the armor set to remove.
   * @returns The removed armor set.
   * @throws {NotFoundException} If the armor set with the specified ID is not found.
   */
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
