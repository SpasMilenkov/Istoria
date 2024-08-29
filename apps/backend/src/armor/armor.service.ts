import { Injectable } from '@nestjs/common';
import { CreateArmorDto } from './dto/create-armor.dto';
import { UpdateArmorDto } from './dto/update-armor.dto';
import { ArmorResponseDto } from './dto/get-armor.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ArmorService {
  constructor(private db: DatabaseService) {}

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
        ArmorSet: { connect: { id: data.armorSetId } },
      },
      include: { item: true },
    });
    return this.toArmorResponse(armor);
  }

  async findAll(): Promise<ArmorResponseDto[]> {
    const armors = await this.db.armor.findMany({ include: { item: true } });
    return armors.map(this.toArmorResponse);
  }

  async findOne(id: string): Promise<ArmorResponseDto | null> {
    const armor = await this.db.armor.findUnique({
      where: { id },
      include: { item: true },
    });
    return armor ? this.toArmorResponse(armor) : null;
  }

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

  async remove(id: string): Promise<void> {
    await this.db.armor.delete({ where: { id } });
  }

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
    };
  }
}
