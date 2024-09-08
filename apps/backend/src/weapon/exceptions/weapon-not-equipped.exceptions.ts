import { BadRequestException } from '@nestjs/common';

/**
 * @description Exception thrown when an attempt is made to unequip a weapon that is not equipped.
 * @extends BadRequestException
 */
export class WeaponNotEquippedException extends BadRequestException {
  /**
   * @param weaponId - Optional. The ID of the weapon that is not equipped. If not provided, a default message is used.
   */
  constructor(weaponId?: string) {
    super(
      weaponId
        ? `Weapon with ID ${weaponId} is not equipped`
        : 'Weapon is not equipped'
    );
  }
}
