import { NotFoundException } from '@nestjs/common';

export class InventoryNotFoundException extends NotFoundException {
  constructor(inventoryId?: string) {
    if (inventoryId) super(`Inventory with ID ${inventoryId} not found`);
    else super('Inventory not found');
  }
}
