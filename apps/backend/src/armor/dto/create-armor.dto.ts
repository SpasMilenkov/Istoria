import {
  IsString,
  IsInt,
  IsUUID,
  IsEnum,
  IsArray,
  IsPositive,
} from 'class-validator';
import { Attribute, Rarity, Weight } from '@istoria/database';

/**
 * @description Data Transfer Object for creating a new armor.
 */
export class CreateArmorDto {
  /**
   * @description Name of the armor.
   * @example 'Dragon Scale Armor'
   * @errorMessage 'Name must be a string.'
   */
  @IsString({ message: 'Name must be a string.' })
  name: string;

  /**
   * @description List of attributes associated with the armor.
   * @example [Attribute.DEFENSE, Attribute.FIRE_RESISTANCE]
   * @errorMessage 'Attributes must be an array. Each attribute must be a valid Attribute.'
   */
  @IsArray({ message: 'Attributes must be an array.' })
  @IsEnum(Attribute, {
    each: true,
    message: 'Each attribute must be a valid Attribute.',
  })
  attributes: Attribute[];

  /**
   * @description Rarity of the armor.
   * @example Rarity.LEGENDARY
   * @errorMessage 'Rarity must be a valid Rarity.'
   */
  @IsEnum(Rarity, { message: 'Rarity must be a valid Rarity.' })
  rarity: Rarity;

  /**
   * @description Defense value provided by the armor.
   * @example 50
   * @errorMessage 'Defense must be an integer.'
   */
  @IsInt({ message: 'Defense must be an integer.' })
  defense: number;

  /**
   * @description Speed value provided by the armor.
   * @example 10
   * @errorMessage 'Speed must be an integer.'
   */
  @IsInt({ message: 'Speed must be an integer.' })
  speed: number;

  /**
   * @description Agility value provided by the armor.
   * @example 20
   * @errorMessage 'Agility must be an integer.'
   */
  @IsInt({ message: 'Agility must be an integer.' })
  agility: number;

  /**
   * @description Required level to equip the armor.
   * @example 10
   * @errorMessage 'Required level must be an integer and a positive number.'
   */
  @IsInt({ message: 'Required level must be an integer.' })
  @IsPositive({ message: 'Required level must be a positive number.' })
  requiredLevel: number;

  /**
   * @description Origin of the armor.
   * @example 'Ancient Dragon'
   * @errorMessage 'Origin must be a string.'
   */
  @IsString({ message: 'Origin must be a string.' })
  origin: string;

  /**
   * @description Weight classification of the armor.
   * @example Weight.HEAVY
   * @errorMessage 'Weight must be a valid Weight.'
   */
  @IsEnum(Weight, { message: 'Weight must be a valid Weight.' })
  weight: Weight;

  /**
   * @description UUID of the armor set to which this armor belongs.
   * @example '123e4567-e89b-12d3-a456-426614174000'
   * @errorMessage 'Armor set ID must be a valid UUID.'
   */
  @IsUUID('4', { message: 'Armor set ID must be a valid UUID.' })
  armorSetId: string;

  /**
   * @description Durability value of the armor.
   * @example 100
   * @errorMessage 'Durability must be an integer.'
   */
  @IsInt({ message: 'Durability must be an integer.' })
  durability: number;
}
