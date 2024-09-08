import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { Prisma, Weapon } from '@istoria/database';
import { WeaponNotFoundException } from './exceptions/weapon-not-found.exceptions';

@Injectable()
export class WeaponService {
  /**
   * Creates an instance of WeaponService.
   * @param databaseService - The database service to interact with the database.
   */
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Returns the Prisma client to be used, either from the provided parameter or from the DatabaseService.
   * @param prisma - Optional Prisma client instance for transactional operations.
   * @returns The Prisma client to be used.
   */
  private getClient(prisma?: Prisma.TransactionClient) {
    return prisma || this.databaseService;
  }

  /**
   * Creates a new weapon record in the database.
   * @param createWeaponDto - Data transfer object containing the weapon creation details.
   * @param prisma - Optional Prisma client instance for transactional operations.
   * @returns A promise that resolves with the created Weapon.
   * @throws InternalServerErrorException - If the creation process fails.
   */
  async create(
    createWeaponDto: CreateWeaponDto,
    prisma?: Prisma.TransactionClient
  ): Promise<Weapon> {
    const client = this.getClient(prisma);
    const { baseAttack, ...itemData } = createWeaponDto;
    try {
      return await client.weapon.create({
        data: {
          baseAttack,
          item: {
            create: {
              ...itemData,
              type: 'WEAPON',
            },
          },
        },
        include: { item: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create weapon');
    }
  }

  /**
   * Retrieves all weapons from the database.
   * @param prisma - Optional Prisma client instance for transactional operations.
   * @returns A promise that resolves with an array of Weapons.
   * @throws InternalServerErrorException - If the fetch process fails.
   */
  async findAll(prisma?: Prisma.TransactionClient): Promise<Weapon[]> {
    const client = this.getClient(prisma);
    try {
      return await client.weapon.findMany({
        include: { item: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch weapons');
    }
  }

  /**
   * Retrieves a single weapon by its ID.
   * @param options - Object containing the ID of the weapon and optional Prisma client instance.
   * @returns A promise that resolves with the found Weapon.
   * @throws WeaponNotFoundException - If the weapon with the specified ID is not found.
   * @throws InternalServerErrorException - If the fetch process fails.
   */
  async findOne(options: {
    id: string;
    prisma?: Prisma.TransactionClient;
  }): Promise<Weapon> {
    const { id, prisma } = options;
    const client = this.getClient(prisma);
    try {
      const weapon = await client.weapon.findUnique({
        where: { id },
        include: { item: true },
      });
      if (!weapon) {
        throw new WeaponNotFoundException(id);
      }
      return weapon;
    } catch (error) {
      if (error instanceof WeaponNotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to fetch weapon with ID ${id}`
      );
    }
  }

  /**
   * Updates an existing weapon by its ID.
   * @param id - The ID of the weapon to update.
   * @param updateWeaponDto - Data transfer object containing the updated weapon details.
   * @param prisma - Optional Prisma client instance for transactional operations.
   * @returns A promise that resolves with the updated Weapon.
   * @throws WeaponNotFoundException - If the weapon with the specified ID is not found.
   * @throws InternalServerErrorException - If the update process fails.
   */
  async update(
    id: string,
    updateWeaponDto: UpdateWeaponDto,
    prisma?: Prisma.TransactionClient
  ): Promise<Weapon> {
    const client = this.getClient(prisma);
    const { baseAttack, ...itemData } = updateWeaponDto;
    try {
      return await client.weapon.update({
        where: { id },
        data: {
          baseAttack,
          item: {
            update: itemData,
          },
        },
        include: { item: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new WeaponNotFoundException(id);
        }
      }
      throw new InternalServerErrorException(
        `Failed to update weapon with ID ${id}`
      );
    }
  }

  /**
   * Removes a weapon by its ID.
   * @param id - The ID of the weapon to remove.
   * @param prisma - Optional Prisma client instance for transactional operations.
   * @returns A promise that resolves when the weapon is removed.
   * @throws WeaponNotFoundException - If the weapon with the specified ID is not found.
   * @throws InternalServerErrorException - If the removal process fails.
   */
  async remove(id: string, prisma?: Prisma.TransactionClient): Promise<void> {
    const client = this.getClient(prisma);
    try {
      await client.weapon.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new WeaponNotFoundException(id);
        }
      }
      throw new InternalServerErrorException(
        `Failed to remove weapon with ID ${id}`
      );
    }
  }

  /**
   * Executes a provided operation within a transaction.
   * @param operation - The operation to be executed within the transaction.
   * @returns A promise that resolves with the result of the operation.
   */
  public async executeInTransaction<T>(
    operation: (prisma: Prisma.TransactionClient) => Promise<T>
  ): Promise<T> {
    return this.databaseService.$transaction(operation);
  }
}
