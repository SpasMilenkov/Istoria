import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { WeaponNotFoundException } from './exceptions/weapon-not-found.exceptions';

/**
 * Controller responsible for handling requests related to weapons.
 */
@Controller('weapons')
export class WeaponController {
  /**
   * Creates an instance of WeaponController.
   * @param weaponService - The service used to handle weapon operations.
   */
  constructor(private readonly weaponService: WeaponService) {}

  /**
   * Creates a new weapon.
   * @param createWeaponDto - Data transfer object containing weapon creation details.
   * @returns The created weapon.
   * @throws HttpException - If the creation process fails.
   */
  @Post()
  async create(@Body() createWeaponDto: CreateWeaponDto) {
    try {
      return await this.weaponService.create(createWeaponDto);
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Retrieves all weapons.
   * @returns An array of weapons.
   * @throws HttpException - If fetching weapons fails.
   */
  @Get()
  async findAll() {
    try {
      return await this.weaponService.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch weapons',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Retrieves a weapon by its ID.
   * @param id - The ID of the weapon to retrieve.
   * @returns The found weapon.
   * @throws HttpException - If the weapon is not found or an error occurs.
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.weaponService.findOne({ id });
    } catch (error) {
      if (error instanceof WeaponNotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Updates an existing weapon by its ID.
   * @param id - The ID of the weapon to update.
   * @param updateWeaponDto - Data transfer object containing updated weapon details.
   * @returns The updated weapon.
   * @throws HttpException - If the weapon is not found or the update fails.
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWeaponDto: UpdateWeaponDto
  ) {
    try {
      return await this.weaponService.update(id, updateWeaponDto);
    } catch (error) {
      if (error instanceof WeaponNotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to update weapon',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Removes a weapon by its ID.
   * @param id - The ID of the weapon to remove.
   * @returns A success message upon removal.
   * @throws HttpException - If the weapon is not found or the removal fails.
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.weaponService.remove(id);
      return { message: 'Weapon successfully removed' };
    } catch (error) {
      if (error instanceof WeaponNotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to remove weapon',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
