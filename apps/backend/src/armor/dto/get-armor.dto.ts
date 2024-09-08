import { IsString, IsInt, IsUUID, IsEnum, IsArray } from 'class-validator';
import { Attribute, Rarity, Weight } from '@istoria/database';

/**
 * @description Data Transfer Object for armor responses.
 */
export class ArmorResponseDto {
  /**
   * @description Unique identifier of the armor.
   * @example 'e9b256f0-8657-4f1e-bc4b-2a37d7641d9d'
   * @errorMessage 'id must be a valid UUID'
   */
  @IsUUID(undefined, { message: 'id must be a valid UUID' })
  id: string;

  /**
   * @description Name of the armor.
   * @example 'Steel Chestplate'
   * @errorMessage 'name must be a string'
   */
  @IsString({ message: 'name must be a string' })
  name: string;

  /**
   * @description Array of attributes associated with the armor.
   * @example ['STRENGTH', 'AGILITY']
   * @errorMessage 'attributes must be an array of valid attributes'
   */
  @IsArray({ message: 'attributes must be an array' })
  @IsEnum(Attribute, {
    each: true,
    message: 'Each attribute must be a valid enum value',
  })
  attributes: Attribute[];

  /**
   * @description Rarity of the armor.
   * @example 'LEGENDARY'
   * @errorMessage 'rarity must be a valid rarity enum value'
   */
  @IsEnum(Rarity, { message: 'rarity must be a valid rarity enum value' })
  rarity: Rarity;

  /**
   * @description Defense rating of the armor.
   * @example 50
   * @errorMessage 'defense must be an integer'
   */
  @IsInt({ message: 'defense must be an integer' })
  defense: number;

  /**
   * @description Speed rating of the armor.
   * @example 10
   * @errorMessage 'speed must be an integer'
   */
  @IsInt({ message: 'speed must be an integer' })
  speed: number;

  /**
   * @description Agility rating of the armor.
   * @example 15
   * @errorMessage 'agility must be an integer'
   */
  @IsInt({ message: 'agility must be an integer' })
  agility: number;

  /**
   * @description Required level to equip the armor.
   * @example 10
   * @errorMessage 'requiredLevel must be an integer'
   */
  @IsInt({ message: 'requiredLevel must be an integer' })
  requiredLevel: number;

  /**
   * @description Origin of the armor.
   * @example 'Blacksmith's Forge'
   * @errorMessage 'origin must be a string'
   */
  @IsString({ message: 'origin must be a string' })
  origin: string;

  /**
   * @description Weight category of the armor.
   * @example 'HEAVY'
   * @errorMessage 'weight must be a valid weight enum value'
   */
  @IsEnum(Weight, { message: 'weight must be a valid weight enum value' })
  weight: Weight;

  /**
   * @description ID of the associated armor set.
   * @example '2c8f7a8e-d27e-4cb8-8c21-1a4c3ef3d5c0'
   * @errorMessage 'armorSetId must be a valid UUID'
   */
  @IsUUID(undefined, { message: 'armorSetId must be a valid UUID' })
  armorSetId: string;

  /**
   * @description ID of the associated item.
   * @example '3a9e71cf-0d9e-43b7-a774-7993cdaaa080'
   * @errorMessage 'itemId must be a valid UUID'
   */
  @IsUUID(undefined, { message: 'itemId must be a valid UUID' })
  itemId: string;

  /**
   * @description Durability rating of the armor.
   * @example 100
   * @errorMessage 'durability must be an integer'
   */
  @IsInt({ message: 'durability must be an integer' })
  durability: number;

  /**
   * @description Type of armor piece (e.g., helmet, chestplate).
   * @example 'CHESTPLATE'
   * @errorMessage 'armorPiece must be a string'
   */
  @IsString({ message: 'armorPiece must be a string' })
  armorPiece: string;
}
