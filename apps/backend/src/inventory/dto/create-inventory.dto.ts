import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

/**
 * @description Data Transfer Object for creating a new inventory.
 */
export class CreateInventoryDto {
  /**
   * @description The initial capacity of the inventory.
   * @example 10
   */
  @IsInt({ message: 'Starting capacity must be an integer' })
  @Min(1, { message: 'Starting capacity must be at least 1' })
  @Max(1000, { message: 'Starting capacity cannot exceed 1000' })
  startingCapacity: number;

  /**
   * @description The ID of the starting weapon for the inventory.
   * @example '123e4567-e89b-12d3-a456-426614174001'
   */
  @IsString({ message: 'Starting weapon ID must be a string' })
  @IsNotEmpty({ message: 'Starting weapon ID is required' })
  startingWeaponId: string;
}
