import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ArmorService } from './armor.service';
import { CreateArmorDto } from './dto/create-armor.dto';
import { UpdateArmorDto } from './dto/update-armor.dto';
import { ArmorResponseDto } from './dto/get-armor.dto';

/**
 * @description Controller for managing armor-related HTTP requests.
 * Provides endpoints to create, retrieve, update, and delete armor items.
 */
@Controller('armors')
export class ArmorController {
  /**
   * @param armorService - Service responsible for the business logic related to armor items.
   */
  constructor(private readonly armorService: ArmorService) {}

  /**
   * @description Creates a new armor item.
   * @param createArmorDto - Data Transfer Object containing information for the new armor item.
   * @returns The created armor item, represented by `ArmorResponseDto`.
   */
  @Post()
  create(@Body() createArmorDto: CreateArmorDto): Promise<ArmorResponseDto> {
    return this.armorService.create(createArmorDto);
  }

  /**
   * @description Retrieves all armor items.
   * @returns An array of armor items, each represented by `ArmorResponseDto`.
   */
  @Get()
  findAll(): Promise<ArmorResponseDto[]> {
    return this.armorService.findAll();
  }

  /**
   * @description Retrieves a single armor item by its ID.
   * @param id - The ID of the armor item to retrieve.
   * @returns The requested armor item, represented by `ArmorResponseDto`, or `null` if not found.
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ArmorResponseDto | null> {
    return this.armorService.findOne({ id });
  }

  /**
   * @description Updates an existing armor item.
   * @param id - The ID of the armor item to update.
   * @param updateArmorDto - Data Transfer Object containing updated information for the armor item.
   * @returns The updated armor item, represented by `ArmorResponseDto`.
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArmorDto: UpdateArmorDto
  ): Promise<ArmorResponseDto> {
    return this.armorService.update(id, updateArmorDto);
  }

  /**
   * @description Removes an armor item by its ID.
   * @param id - The ID of the armor item to remove.
   * @returns A promise that resolves when the item has been removed.
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.armorService.remove(id);
  }
}
