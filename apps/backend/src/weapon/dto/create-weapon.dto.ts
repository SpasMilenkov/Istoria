import { Attribute, Rarity, Weight } from '@istoria/database';
import { IsArray, IsEnum, IsInt, IsPositive, IsString } from 'class-validator';

/**
 * @description Data Transfer Object for creating a new weapon.
 */
export class CreateWeaponDto {
  /**
   * @description Base attack value of the weapon.
   * @example 50
   * @errorMessage 'Base attack must be an integer.'
   */
  @IsInt({ message: 'Base attack must be an integer.' })
  baseAttack: number;

  /**
   * @description Name of the weapon.
   * @example 'Excalibur'
   * @errorMessage 'Name must be a string.'
   */
  @IsString({ message: 'Name must be a string.' })
  name: string;

  /**
   * @description List of attributes associated with the weapon.
   * @example [Attribute.FIRE_DAMAGE, Attribute.CRITICAL_HIT]
   * @errorMessage 'Attributes must be an array. Each attribute must be a valid Attribute.'
   */
  @IsArray({ message: 'Attributes must be an array.' })
  @IsEnum(Attribute, {
    each: true,
    message: 'Each attribute must be a valid Attribute.',
  })
  attributes: Attribute[];

  /**
   * @description Rarity of the weapon.
   * @example Rarity.EPIC
   * @errorMessage 'Rarity must be a valid Rarity.'
   */
  @IsEnum(Rarity, { message: 'Rarity must be a valid Rarity.' })
  rarity: Rarity;

  /**
   * @description Defense value provided by the weapon (if applicable).
   * @example 10
   * @errorMessage 'Defense must be an integer.'
   */
  @IsInt({ message: 'Defense must be an integer.' })
  defense: number;

  /**
   * @description Speed value provided by the weapon (if applicable).
   * @example 5
   * @errorMessage 'Speed must be an integer.'
   */
  @IsInt({ message: 'Speed must be an integer.' })
  speed: number;

  /**
   * @description Agility value provided by the weapon (if applicable).
   * @example 7
   * @errorMessage 'Agility must be an integer.'
   */
  @IsInt({ message: 'Agility must be an integer.' })
  agility: number;

  /**
   * @description Required level to equip the weapon.
   * @example 15
   * @errorMessage 'Required level must be an integer and a positive number.'
   */
  @IsInt({ message: 'Required level must be an integer.' })
  @IsPositive({ message: 'Required level must be a positive number.' })
  requiredLevel: number;

  /**
   * @description Origin of the weapon.
   * @example 'Legendary Forge'
   * @errorMessage 'Origin must be a string.'
   */
  @IsString({ message: 'Origin must be a string.' })
  origin: string;

  /**
   * @description Weight classification of the weapon.
   * @example Weight.LIGHT
   * @errorMessage 'Weight must be a valid Weight.'
   */
  @IsEnum(Weight, { message: 'Weight must be a valid Weight.' })
  weight: Weight;

  /**
   * @description Durability value of the weapon.
   * @example 100
   * @errorMessage 'Durability must be an integer.'
   */
  @IsInt({ message: 'Durability must be an integer.' })
  durability: number;
}
