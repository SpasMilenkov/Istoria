import { Attribute, Rarity, Weight } from '@istoria/database';
import { IsArray, IsEnum, IsInt, IsPositive, IsString } from 'class-validator';

export class CreateWeaponDto {
  // Weapon-specific fields
  @IsInt({ message: 'Base attack must be an integer.' })
  baseAttack: number;

  // Item fields
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

  @IsInt({ message: 'Durability must be an integer.' })
  durability: number;
}
