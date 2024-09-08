import { Injectable } from '@nestjs/common';
import { CreateArmorDto } from './dto/create-armor.dto';
import { UpdateArmorDto } from './dto/update-armor.dto';
import { ArmorResponseDto } from './dto/get-armor.dto';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@istoria/database';

/**
 * @description Service for managing armor-related operations, including creation, retrieval, updating, and deletion of armor records.
 * It interacts with the database through the DatabaseService and performs CRUD operations on armor entities.
 */
@Injectable()
export class ArmorService {
  /**
   * @param db - An instance of the DatabaseService used to interact with the database.
   */
  constructor(private db: DatabaseService) {}

  /**
   * @private
   * @description Gets the Prisma client instance to interact with the database. Uses the provided transaction client if available.
   * @param prisma - Optional transaction client for executing operations within a transaction.
   * @returns The Prisma client instance.
   */
  private getClient(prisma?: Prisma.TransactionClient) {
    return prisma || this.db;
  }

  /**
   * @description Creates a new armor record in the database.
   * @param data - The data used to create the armor, encapsulated in a CreateArmorDto.
   * @returns A promise that resolves to the created armor, represented as an ArmorResponseDto.
   */
  async create(data: CreateArmorDto): Promise<ArmorResponseDto> {
    const armor = await this.db.armor.create({
      data: {
        item: {
          create: {
            name: data.name,
            attributes: data.attributes,
            rarity: data.rarity,
            defense: data.defense,
            speed: data.speed,
            agility: data.agility,
            requiredLevel: data.requiredLevel,
            origin: data.origin,
            weight: data.weight,
            type: 'ARMOR',
            durability: data.durability,
          },
        },
        armorPiece: 'CHESTPLATE',
        ArmorSet: { connect: { id: data.armorSetId } },
      },
      include: { item: true },
    });
    return this.toArmorResponse(armor);
  }

  /**
   * @description Retrieves all armor records from the database.
   * @returns A promise that resolves to an array of ArmorResponseDto, each representing an armor record.
   */
  async findAll(): Promise<ArmorResponseDto[]> {
    const armors = await this.db.armor.findMany({ include: { item: true } });
    return armors.map(this.toArmorResponse);
  }

  /**
   * @description Retrieves a single armor record by its ID.
   * @param options - Contains the ID of the armor to retrieve and an optional transaction client.
   * @param options.id - The ID of the armor to retrieve.
   * @param options.prisma - Optional transaction client for executing operations within a transaction.
   * @returns A promise that resolves to the retrieved armor represented as an ArmorResponseDto, or null if not found.
   */
  async findOne(options: {
    id: string;
    prisma?: Prisma.TransactionClient;
  }): Promise<ArmorResponseDto | null> {
    const { id, prisma } = options;
    const client = this.getClient(prisma);
    const armor = await client.armor.findUnique({
      where: { id },
      include: { item: true },
    });
    return armor ? this.toArmorResponse(armor) : null;
  }

  /**
   * @description Updates an existing armor record.
   * @param id - The ID of the armor to update.
   * @param data - The data to update the armor with, encapsulated in an UpdateArmorDto.
   * @returns A promise that resolves to the updated armor represented as an ArmorResponseDto.
   */
  async update(id: string, data: UpdateArmorDto): Promise<ArmorResponseDto> {
    const armor = await this.db.armor.update({
      where: { id },
      data: {
        item: {
          update: {
            name: data.name,
            attributes: data.attributes,
            rarity: data.rarity,
            defense: data.defense,
            speed: data.speed,
            agility: data.agility,
            requiredLevel: data.requiredLevel,
            origin: data.origin,
            weight: data.weight,
            durability: data.durability,
          },
        },
        ArmorSet: data.armorSetId
          ? { connect: { id: data.armorSetId } }
          : undefined,
      },
      include: { item: true },
    });
    return this.toArmorResponse(armor);
  }

  /**
   * @description Deletes an armor record by its ID.
   * @param id - The ID of the armor to delete.
   * @returns A promise that resolves when the armor is successfully deleted.
   */
  async remove(id: string): Promise<void> {
    await this.db.armor.delete({ where: { id } });
  }

  /**
   * @private
   * @description Converts an armor entity from the database into an ArmorResponseDto.
   * @param armor - The armor entity to convert.
   * @returns The converted armor response as an ArmorResponseDto.
   */
  private toArmorResponse(armor: any): ArmorResponseDto {
    return {
      id: armor.id,
      name: armor.item.name,
      attributes: armor.item.attributes,
      rarity: armor.item.rarity,
      defense: armor.item.defense,
      speed: armor.item.speed,
      agility: armor.item.agility,
      requiredLevel: armor.item.requiredLevel,
      origin: armor.item.origin,
      weight: armor.item.weight,
      armorSetId: armor.armorSetId,
      itemId: armor.item.id,
      durability: armor.item.durability,
      armorPiece: armor.armorPiece,
    };
  }
}
