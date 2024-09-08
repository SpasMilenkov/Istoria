import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { WeaponService } from '../weapon/weapon.service';
import { Inventory, Prisma, Weapon } from '@istoria/database';
import { ArmorService } from '../armor/armor.service';
import { ArmorAlreadyEquippedException } from '../armor/exceptions/armor-already-equipped.exceptions';
import { ArmorNotFoundException } from '../armor/exceptions/armor-not-found.exception';
import { InventoryNotFoundException } from './exceptions/inventory-not-found.exception';
import { WeaponNotFoundException } from '../weapon/exceptions/weapon-not-found.exceptions';
import { WeaponNotEquippedException } from '../weapon/exceptions/weapon-not-equipped.exceptions';
import { WeaponAlreadyEquippedException } from '../weapon/exceptions/weapon-already-equipped.exception';

/**
 * @description Service for managing and manipulating the player's inventory.
 */
@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly weaponService: WeaponService,
    private readonly armorService: ArmorService
  ) {}

  /**
   * @description Retrieves an inventory by its ID.
   * @param inventoryId - The ID of the inventory to retrieve.
   * @param prisma - An optional Prisma transaction client.
   * @returns The inventory object including its items, equipped armor, and weapon.
   * @throws InventoryNotFoundException - If the inventory is not found.
   */
  public async findOne(inventoryId: string, prisma?: Prisma.TransactionClient) {
    const client = this.getClient(prisma);
    return await client.inventory.findUnique({
      where: { id: inventoryId },
      include: { items: true, equippedArmor: true, equippedWeapon: true },
    });
  }

  /**
   * @description Creates a new inventory for a character with a starting weapon.
   * @param startingWeaponId - The ID of the weapon to equip initially.
   * @param prisma - An optional Prisma transaction client.
   * @returns The newly created inventory.
   * @throws Error - If the character or weapon is not found.
   */

  public async create(startingWeaponId: string): Promise<Inventory> {
    return await this.prisma.$transaction(async (transactionClient) => {
      const startingWeapon: Weapon = await this.weaponService.findOne({
        id: startingWeaponId,
        prisma: transactionClient,
      });

      if (!startingWeapon) {
        throw new Error('Starting weapon not found');
      }

      // Then, create the Inventory and connect it to the EquippedWeapon
      const inventory = await transactionClient.inventory.create({
        data: {
          capacity: 10,
        },
      });
      // create the EquippedWeapon
      await transactionClient.equippedWeapon.create({
        data: {
          inventory: {
            connect: { id: inventory.id },
          },
          weapon: {
            connect: { id: startingWeapon.id },
          },
        },
      });
      return inventory;
    });
  }

  /**
   * @description Adds a single item to an inventory.
   * @param inventoryId - The ID of the inventory to which the item will be added.
   * @param itemId - The ID of the item to add.
   * @param prisma - An optional Prisma transaction client.
   * @returns The updated inventory with the new item.
   * @throws Error - If the inventory or item is not found.
   */
  public async addSingleItem(
    inventoryId: string,
    itemId: string,
    prisma?: Prisma.TransactionClient
  ) {
    const client = this.getClient(prisma);
    const inventory = await this.findOne(inventoryId, client);
    if (!inventory) {
      throw new Error('Inventory not found');
    }

    const item = await client.item.findFirst({ where: { id: itemId } });
    if (!item) {
      throw new Error('Item not found');
    }

    const inventoryItem = await client.inventoryItem.create({
      data: {
        quantity: 1,
        item: { connect: { id: item.id } },
        inventory: { connect: { id: inventory.id } },
      },
    });

    return await client.inventory.update({
      where: { id: inventory.id },
      data: { items: { connect: { id: inventoryItem.id } } },
      include: { items: true },
    });
  }

  /**
   * @description Adds multiple items to an inventory.
   * @param inventoryId - The ID of the inventory to which the items will be added.
   * @param itemIds - An array of item IDs to add.
   * @param prisma - An optional Prisma transaction client.
   * @returns The updated inventory with the new items.
   * @throws Error - If the inventory or any item is not found.
   */
  public async addMultipleItems(
    inventoryId: string,
    itemIds: string[],
    prisma?: Prisma.TransactionClient
  ) {
    const client = this.getClient(prisma);

    const inventory = await this.findOne(inventoryId, client);
    if (!inventory) {
      throw new Error('Inventory not found');
    }

    const items = await client.item.findMany({
      where: { id: { in: itemIds } },
    });
    if (items.length === 0) {
      throw new Error('No valid items found');
    }

    const inventoryItems = await Promise.all(
      items.map((item) =>
        client.inventoryItem.create({
          data: {
            quantity: 1,
            item: { connect: { id: item.id } },
            inventory: { connect: { id: inventory.id } },
          },
        })
      )
    );

    return await client.inventory.update({
      where: { id: inventory.id },
      data: {
        items: {
          connect: inventoryItems.map((inventoryItem) => ({
            id: inventoryItem.id,
          })),
        },
      },
      include: { items: true },
    });
  }

  /**
   * @description Removes specified items from an inventory.
   * @param inventoryId - The ID of the inventory from which items will be removed.
   * @param itemIds - An array of item IDs to remove.
   * @param prisma - An optional Prisma transaction client.
   * @returns The updated inventory after item removal.
   * @throws Error - If the inventory or items are not found.
   */
  public async removeItems(
    inventoryId: string,
    itemIds: string[],
    prisma?: Prisma.TransactionClient
  ) {
    const client = this.getClient(prisma);

    const inventory = await this.findOne(inventoryId, client);

    if (!inventory) {
      throw new Error('Inventory not found');
    }

    const inventoryItems = await client.inventoryItem.findMany({
      where: { inventoryId: inventoryId, itemId: { in: itemIds } },
    });

    if (inventoryItems.length === 0) {
      throw new Error('No items to remove found in inventory');
    }

    await client.inventory.update({
      where: { id: inventory.id },
      data: {
        items: {
          disconnect: inventoryItems.map((inventoryItem) => ({
            id: inventoryItem.id,
          })),
        },
      },
    });

    await client.inventoryItem.deleteMany({
      where: {
        id: { in: inventoryItems.map((inventoryItem) => inventoryItem.id) },
      },
    });

    return await this.findOne(inventory.id, client);
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
  public async equipArmor(options: {
    armorPieceId: string;
    inventoryId: string;
  }): Promise<Inventory> {
    const { armorPieceId, inventoryId } = options;

    try {
      return await this.prisma.$transaction(async (client) => {
        const inventory = await this.findOne(inventoryId, client);
        if (!inventory)
          throw new InventoryNotFoundException('Inventory not found');

        const armor = await this.armorService.findOne({
          id: armorPieceId,
          prisma: client,
        });
        if (!armor) throw new ArmorNotFoundException('Armor not found');

        if (
          inventory.equippedArmor.some(
            (equippedArmor) => equippedArmor.id === armorPieceId
          )
        ) {
          throw new ArmorAlreadyEquippedException(armor.id);
        }

        const alreadyEquipped = inventory.equippedArmor.find(
          (equippedArmor) => equippedArmor.armorPiece === armor.armorPiece
        );

        if (alreadyEquipped) {
          await this.unequipArmor({
            inventoryId: inventory.id,
            armorPieceId: alreadyEquipped.id,
          });
        }

        return await client.inventory.update({
          where: { id: inventory.id },
          data: {
            equippedArmor: {
              connect: { id: armor.id },
            },
          },
          include: { equippedArmor: true },
        });
      });
    } catch (error) {
      if (
        error instanceof ArmorNotFoundException ||
        error instanceof InventoryNotFoundException ||
        error instanceof ArmorAlreadyEquippedException
      ) {
        throw error;
      }

      console.error('An error occurred while equipping armor:', error);
      throw new Error('Failed to equip armor. Please try again later.');
    }
  }

  /**
   * @description Unequips a specific armor piece from an inventory.
   * @param inventoryId - The ID of the inventory from which the armor will be unequipped.
   * @param armorPieceId - The ID of the armor piece to unequip.
   * @returns The updated inventory with the armor unequipped.
   * @throws ArmorNotFoundException - If the armor piece is not found.
   * @throws InventoryNotFoundException - If the inventory is not found.
   */
  public async unequipArmor(options: {
    inventoryId: string;
    armorPieceId: string;
  }): Promise<Inventory> {
    const { inventoryId, armorPieceId } = options;

    try {
      return await this.prisma.$transaction(async (client) => {
        const armor = await this.armorService.findOne({
          id: armorPieceId,
          prisma: client,
        });
        if (!armor) throw new ArmorNotFoundException('Armor not found');

        const inventory = await this.findOne(inventoryId, client);
        if (!inventory)
          throw new InventoryNotFoundException('Inventory not found');

        if (
          !inventory.equippedArmor.some(
            (equippedArmor) => equippedArmor.id === armorPieceId
          )
        )
          throw new ArmorNotFoundException(armorPieceId);

        return await client.inventory.update({
          where: { id: inventory.id },
          data: {
            equippedArmor: {
              disconnect: { id: armor.id },
            },
          },
          include: { equippedArmor: true },
        });
      });
    } catch (error) {
      if (
        error instanceof ArmorNotFoundException ||
        error instanceof InventoryNotFoundException
      ) {
        throw error;
      }

      console.error('An error occurred while unequipping armor:', error);
      throw new Error('Failed to unequip armor. Please try again later.');
    }
  }

  /**
   * @description Equips a specific weapon to an inventory.
   * @param weaponId - The ID of the weapon to equip.
   * @param inventoryId - The ID of the inventory to which the weapon will be equipped.
   * @returns The updated inventory with the newly equipped weapon.
   * @throws WeaponNotFoundException - If the weapon is not found.
   * @throws InventoryNotFoundException - If the inventory is not found.
   * @throws WeaponAlreadyEquippedException - If the weapon is already equipped.
   */
  public async equipWeapon(options: {
    weaponId: string;
    inventoryId: string;
  }): Promise<Inventory> {
    const { weaponId, inventoryId } = options;

    try {
      return await this.prisma.$transaction(async (client) => {
        const inventory = await this.findOne(inventoryId, client);
        if (!inventory)
          throw new InventoryNotFoundException('Inventory not found');

        const weapon = await this.weaponService.findOne({
          id: weaponId,
          prisma: client,
        });
        console.log(weapon);
        if (!weapon) throw new WeaponNotFoundException('Weapon not found');

        if (
          inventory.equippedWeapon &&
          inventory.equippedWeapon.id === weaponId
        ) {
          throw new WeaponAlreadyEquippedException(weapon.id);
        }

        if (inventory.equippedWeapon) {
          await this.unequipWeapon({
            inventoryId: inventory.id,
            weaponId: inventory.equippedWeapon.weaponId,
          });
        }
        // create the EquippedWeapon
        const equipWeapon = await client.equippedWeapon.create({
          data: {
            inventory: {
              connect: { id: inventory.id },
            },
            weapon: {
              connect: { id: weapon.id },
            },
          },
        });

        return await client.inventory.update({
          where: { id: inventory.id },
          data: {
            equippedWeapon: {
              connect: { id: equipWeapon.id },
            },
          },
        });
      });
    } catch (error) {
      if (
        error instanceof WeaponNotFoundException ||
        error instanceof InventoryNotFoundException ||
        error instanceof WeaponAlreadyEquippedException
      ) {
        throw error;
      }

      console.error('An error occurred while equipping weapon:', error);
      throw new Error('Failed to equip weapon. Please try again later.');
    }
  }

  /**
   * @description Unequips a specific weapon from an inventory.
   * @param inventoryId - The ID of the inventory from which the weapon will be unequipped.
   * @param weaponId - The ID of the weapon to unequip.
   * @returns The updated inventory with the weapon unequipped.
   * @throws WeaponNotFoundException - If the weapon is not found.
   * @throws InventoryNotFoundException - If the inventory is not found.
   * @throws WeaponNotEquippedException - If the weapon is not currently equipped.
   */
  public async unequipWeapon(options: {
    inventoryId: string;
    weaponId: string;
  }): Promise<Inventory> {
    const { inventoryId, weaponId } = options;

    try {
      return await this.prisma.$transaction(async (client) => {
        const inventory = await this.findOne(inventoryId, client);
        if (!inventory)
          throw new InventoryNotFoundException('Inventory not found');

        const weapon = await this.weaponService.findOne({
          id: weaponId,
          prisma: client,
        });
        if (!weapon) throw new WeaponNotFoundException('Weapon not found');

        const equippedWeapon = await client.equippedWeapon.findUnique({
          where: { inventoryId: inventory.id },
          include: { weapon: true },
        });

        if (!equippedWeapon || equippedWeapon.weapon.id !== weaponId) {
          throw new WeaponNotEquippedException(weaponId);
        }

        // Delete the EquippedWeapon entry
        await client.equippedWeapon.delete({
          where: { id: equippedWeapon.id },
        });

        // Update the Inventory
        const updatedInventory = await client.inventory.update({
          where: { id: inventory.id },
          data: {
            equippedWeaponId: null,
          },
          include: {
            equippedWeapon: true,
          },
        });

        return updatedInventory;
      });
    } catch (error) {
      if (
        error instanceof WeaponNotFoundException ||
        error instanceof InventoryNotFoundException ||
        error instanceof WeaponNotEquippedException
      ) {
        throw error;
      }
      console.error('An error occurred while unequipping weapon:', error);
      throw new Error('Failed to unequip weapon. Please try again later.');
    }
  }

  /**
   * @description Helper method to get the Prisma client, either the transaction client or the default client.
   * @param prisma - An optional Prisma transaction client.
   * @returns The Prisma client to use.
   */
  private getClient(prisma?: Prisma.TransactionClient) {
    return prisma || this.prisma;
  }
}
