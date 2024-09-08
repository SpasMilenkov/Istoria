import { BadRequestException } from '@nestjs/common';

/**
 * @description Exception thrown when an attempt is made to equip a weapon that is already equipped.
 * @extends BadRequestException
 */
export class WeaponAlreadyEquippedException extends BadRequestException {
  /**
   * @param weaponId - Optional. The ID of the weapon that is already equipped. If not provided, a default message is used.
   */
  constructor(weaponId?: string) {
    super(
      weaponId
        ? `Weapon with ID ${weaponId} is already equipped`
        : 'Weapon is already equipped'
    );
  }
}
