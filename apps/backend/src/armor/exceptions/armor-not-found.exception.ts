import { NotFoundException } from '@nestjs/common';

/**
 * @description Exception thrown when an armor item is not found.
 */
export class ArmorNotFoundException extends NotFoundException {
  /**
   * @param armorId - Optional. The ID of the armor that was not found. If not provided, a general 'Armor not found' message is used.
   */
  constructor(armorId?: string) {
    super(armorId ? `Armor with ID ${armorId} not found` : 'Armor not found');
  }
}
