import { IsString, IsUUID, IsOptional, IsArray } from 'class-validator';

/**
 * @description Data Transfer Object for creating a new armor set.
 */
export class CreateArmorSetDto {
  /**
   * @description Name of the armor set.
   * @example 'Dragon Slayer Set'
   * @errorMessage 'name must be a string'
   */
  @IsString({ message: 'name must be a string' })
  name: string;

  /**
   * @description List of UUIDs representing set bonuses for the armor set.
   * @example ['123e4567-e89b-12d3-a456-426614174000']
   * @errorMessage 'setBonus must be an array of UUIDs'
   */
  @IsArray({ message: 'setBonus must be an array' })
  @IsUUID(4, { each: true, message: 'Each setBonus item must be a valid UUID' })
  @IsOptional()
  setBonus?: string[];

  /**
   * @description List of UUIDs representing buffs for the armor set.
   * @example ['123e4567-e89b-12d3-a456-426614174001']
   * @errorMessage 'buffs must be an array of UUIDs'
   */
  @IsArray({ message: 'buffs must be an array' })
  @IsUUID(4, { each: true, message: 'Each buff item must be a valid UUID' })
  @IsOptional()
  buffs?: string[];

  /**
   * @description List of UUIDs representing debuffs for the armor set.
   * @example ['123e4567-e89b-12d3-a456-426614174002']
   * @errorMessage 'debuffs must be an array of UUIDs'
   */
  @IsArray({ message: 'debuffs must be an array' })
  @IsUUID(4, { each: true, message: 'Each debuff item must be a valid UUID' })
  @IsOptional()
  debuffs?: string[];
}
