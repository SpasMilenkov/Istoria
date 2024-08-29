import { IsString, IsInt, IsUUID, IsEnum, IsArray } from 'class-validator';
import { Attribute, Rarity, Weight } from '@istoria/database';

export class ArmorResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsArray()
  @IsEnum(Attribute, { each: true })
  attributes: Attribute[];

  @IsEnum(Rarity)
  rarity: Rarity;

  @IsInt()
  defense: number;

  @IsInt()
  speed: number;

  @IsInt()
  agility: number;

  @IsInt()
  requiredLevel: number;

  @IsString()
  origin: string;

  @IsEnum(Weight)
  weight: Weight;

  @IsUUID()
  armorSetId: string;

  @IsUUID()
  itemId: string;

  @IsInt()
  durability: number;
}
