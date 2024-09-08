import { NotFoundException } from '@nestjs/common';

/**
 * @description Exception thrown when a weapon with the specified ID is not found.
 * @extends NotFoundException
 */
export class WeaponNotFoundException extends NotFoundException {
  /**
   * @param weaponId - Optional. The ID of the weapon that was not found. If not provided, a default message is used.
   */
  constructor(weaponId?: string) {
    super(
      weaponId ? `Weapon with ID ${weaponId} not found` : 'Weapon not found'
    );
  }
}
