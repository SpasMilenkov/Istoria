import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryNotFoundException } from './exceptions/inventory-not-found.exception';
import { ArmorNotFoundException } from '../armor/exceptions/armor-not-found.exception';
import { ArmorAlreadyEquippedException } from '../armor/exceptions/armor-already-equipped.exceptions';
import { WeaponAlreadyEquippedException } from '../weapon/exceptions/weapon-already-equipped.exception';
import { WeaponNotFoundException } from '../weapon/exceptions/weapon-not-found.exceptions';
import { WeaponNotEquippedException } from '../weapon/exceptions/weapon-not-equipped.exceptions';

/**
 * @description Controller for managing inventory-related operations.
 */
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  /**
   * @description Retrieves an inventory by its ID.
   * @param id - The ID of the inventory to retrieve.
   * @returns The inventory object.
   * @throws HttpException - Throws a 404 error if the inventory is not found, or a 500 error for other server issues.
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.inventoryService.findOne(id);
    } catch (error) {
      if (error instanceof InventoryNotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description Creates a new inventory for a character.
   * @param createInventoryDto - DTO containing `characterId` and `startingWeaponId` for the new inventory.
   * @returns The newly created inventory.
   * @throws HttpException - Throws a 404 error if the character or weapon is not found, or a 500 error for other server issues.
   */
  @Post()
  async create(
    @Body()
    createInventoryDto: {
      startingWeaponId: string;
    }
  ) {
    try {
      return await this.inventoryService.create(
        createInventoryDto.startingWeaponId
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      console.error(error);
      throw new HttpException(
        'Failed to create inventory',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description Adds a single item to an inventory.
   * @param id - The ID of the inventory to which the item will be added.
   * @param addItemDto - DTO containing `itemId` to add.
   * @returns The updated inventory with the new item added.
   * @throws HttpException - Throws a 404 error if the inventory or item is not found, or a 500 error for other server issues.
   */
  @Put(':id/add-item')
  async addSingleItem(
    @Param('id') id: string,
    @Body() addItemDto: { itemId: string }
  ) {
    try {
      console.log('hello?');
      return await this.inventoryService.addSingleItem(id, addItemDto.itemId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to add item to inventory',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description Adds multiple items to an inventory.
   * @param id - The ID of the inventory to which the items will be added.
   * @param addItemsDto - DTO containing an array of `itemIds` to add.
   * @returns The updated inventory with the new items added.
   * @throws HttpException - Throws a 400 error if the request is invalid, or a 500 error for other server issues.
   */
  @Put(':id/add-items')
  async addMultipleItems(
    @Param('id') id: string,
    @Body() addItemsDto: { itemIds: string[] }
  ) {
    try {
      return await this.inventoryService.addMultipleItems(
        id,
        addItemsDto.itemIds
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Failed to add items to inventory',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description Removes specified items from an inventory.
   * @param id - The ID of the inventory from which items will be removed.
   * @param removeItemsDto - DTO containing an array of `itemIds` to remove.
   * @returns The updated inventory with the specified items removed.
   * @throws HttpException - Throws a 400 error if the request is invalid, a 404 error if the inventory or items are not found, or a 500 error for other server issues.
   */
  @Delete(':id/remove-items')
  async removeItems(
    @Param('id') id: string,
    @Body() removeItemsDto: { itemIds: string[] }
  ) {
    try {
      return await this.inventoryService.removeItems(
        id,
        removeItemsDto.itemIds
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to remove items from inventory',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description Equips a specific armor piece to an inventory.
   * @param armorPieceId - The ID of the armor piece to equip.
   * @param inventoryId - The ID of the inventory to which the armor will be equipped.
   * @returns The updated inventory with the newly equipped armor.
   * @throws ArmorNotFoundException - If the armor piece is not found.
   * @throws InventoryNotFoundException - If the inventory is not found.
   * @throws ArmorAlreadyEquippedException - If the armor piece is already equipped.
   */
  @Post(':inventoryId/equip-armor/:armorPieceId')
  async equipArmor(
    @Param('inventoryId') inventoryId: string,
    @Param('armorPieceId') armorPieceId: string
  ) {
    try {
      return await this.inventoryService.equipArmor({
        armorPieceId,
        inventoryId,
      });
    } catch (error) {
      if (
        error instanceof ArmorNotFoundException ||
        error instanceof InventoryNotFoundException ||
        error instanceof ArmorAlreadyEquippedException
      ) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to equip armor. Please try again later.'
      );
    }
  }

  /**
   * @description Unequips a specific armor piece from an inventory.
   * @param armorPieceId - The ID of the armor piece to unequip.
   * @param inventoryId - The ID of the inventory from which the armor will be unequipped.
   * @returns The updated inventory with the armor unequipped.
   * @throws ArmorNotFoundException - If the armor piece is not found.
   * @throws InventoryNotFoundException - If the inventory is not found.
   */
  @Post(':inventoryId/unequip-armor/:armorPieceId')
  async unequipArmor(
    @Param('inventoryId') inventoryId: string,
    @Param('armorPieceId') armorPieceId: string
  ) {
    try {
      return await this.inventoryService.unequipArmor({
        inventoryId,
        armorPieceId,
      });
    } catch (error) {
      if (
        error instanceof ArmorNotFoundException ||
        error instanceof InventoryNotFoundException
      ) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to unequip armor. Please try again later.'
      );
    }
  }

  @Post(':inventoryId/equip-weapon/:weaponId')
  async equipWeapon(
    @Param('inventoryId') inventoryId: string,
    @Param('weaponId') weaponId: string
  ) {
    try {
      return await this.inventoryService.equipWeapon({
        inventoryId,
        weaponId,
      });
    } catch (error) {
      if (
        error instanceof WeaponNotFoundException ||
        error instanceof InventoryNotFoundException
      ) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof WeaponAlreadyEquippedException) {
        throw new BadRequestException(error.message);
      }
      throw new HttpException(
        'Failed to equip weapon. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post(':inventoryId/unequip-weapon/:weaponId')
  async unequipWeapon(
    @Param('inventoryId') inventoryId: string,
    @Param('weaponId') weaponId: string
  ) {
    try {
      return await this.inventoryService.unequipWeapon({
        inventoryId,
        weaponId,
      });
    } catch (error) {
      if (
        error instanceof WeaponNotFoundException ||
        error instanceof InventoryNotFoundException
      ) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof WeaponNotEquippedException) {
        throw new BadRequestException(error.message);
      }
      throw new HttpException(
        'Failed to unequip weapon. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
