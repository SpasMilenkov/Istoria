import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ArmorSetService } from './armor-set.service';
import { CreateArmorSetDto } from './dto/create-armor-set.dto';
import { UpdateArmorSetDto } from './dto/update-armor-set.dto';

/**
 * @description Controller for managing armor sets.
 * Provides endpoints to create, retrieve, update, and delete armor sets.
 */
@Controller('armor-sets')
export class ArmorSetController {
  /**
   * @param armorSetService - Service for handling business logic related to armor sets.
   */
  constructor(private readonly armorSetService: ArmorSetService) {}

  /**
   * @description Creates a new armor set.
   * @param createArmorSetDto - Data Transfer Object containing information for the new armor set.
   * @returns The created armor set.
   */
  @Post()
  create(@Body() createArmorSetDto: CreateArmorSetDto) {
    return this.armorSetService.create(createArmorSetDto);
  }

  /**
   * @description Retrieves all armor sets.
   * @returns An array of armor sets.
   */
  @Get()
  findAll() {
    return this.armorSetService.findAll();
  }

  /**
   * @description Retrieves a single armor set by its ID.
   * @param id - The ID of the armor set to retrieve.
   * @returns The requested armor set.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.armorSetService.findOne(id);
  }

  /**
   * @description Updates an existing armor set.
   * @param id - The ID of the armor set to update.
   * @param updateArmorSetDto - Data Transfer Object containing updated information for the armor set.
   * @returns The updated armor set.
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArmorSetDto: UpdateArmorSetDto
  ) {
    return this.armorSetService.update(id, updateArmorSetDto);
  }

  /**
   * @description Removes an armor set by its ID.
   * @param id - The ID of the armor set to remove.
   * @returns A confirmation of removal.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.armorSetService.remove(id);
  }
}
