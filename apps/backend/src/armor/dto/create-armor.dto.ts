import {
  IsString,
  IsInt,
  IsUUID,
  IsEnum,
  IsArray,
  IsPositive,
} from 'class-validator';
import { Attribute, Rarity, Weight } from '@istoria/database';

export class CreateArmorDto {
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @IsArray({ message: 'Attributes must be an array.' })
  @IsEnum(Attribute, {
    each: true,
    message: 'Each attribute must be a valid Attribute.',
  })
  attributes: Attribute[];

  @IsEnum(Rarity, { message: 'Rarity must be a valid Rarity.' })
  rarity: Rarity;

  @IsInt({ message: 'Defense must be an integer.' })
  defense: number;

  @IsInt({ message: 'Speed must be an integer.' })
  speed: number;

  @IsInt({ message: 'Agility must be an integer.' })
  agility: number;

  @IsInt({ message: 'Required level must be an integer.' })
  @IsPositive({ message: 'Required level must be a positive number.' })
  requiredLevel: number;

  @IsString({ message: 'Origin must be a string.' })
  origin: string;

  @IsEnum(Weight, { message: 'Weight must be a valid Weight.' })
  weight: Weight;

  @IsUUID('4', { message: 'Armor set ID must be a valid UUID.' })
  armorSetId: string;

  @IsInt({ message: 'Durability must be an integer.' })
  durability: number;
}
