import { BadRequestException } from '@nestjs/common';

/**
 * @description Exception thrown when an attempt is made to equip armor that is already equipped.
 */
export class ArmorAlreadyEquippedException extends BadRequestException {
  /**
   * @param armorId - The ID of the armor that is already equipped. Defaults to a generic message if not provided.
   */
  constructor(armorId?: string) {
    super(
      armorId
        ? `Armor with ID ${armorId} is already equipped`
        : 'The specified armor is already equipped'
    );
  }
}
