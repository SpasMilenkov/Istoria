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

@Controller('armor-sets')
export class ArmorSetController {
  constructor(private readonly armorSetService: ArmorSetService) {}

  @Post()
  create(@Body() createArmorSetDto: CreateArmorSetDto) {
    return this.armorSetService.create(createArmorSetDto);
  }

  @Get()
  findAll() {
    return this.armorSetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.armorSetService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArmorSetDto: UpdateArmorSetDto
  ) {
    return this.armorSetService.update(id, updateArmorSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.armorSetService.remove(id);
  }
}
