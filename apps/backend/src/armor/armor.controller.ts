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

@Controller('armors')
export class ArmorController {
  constructor(private readonly armorService: ArmorService) {}

  @Post()
  create(@Body() createArmorDto: CreateArmorDto): Promise<ArmorResponseDto> {
    return this.armorService.create(createArmorDto);
  }

  @Get()
  findAll(): Promise<ArmorResponseDto[]> {
    return this.armorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ArmorResponseDto | null> {
    return this.armorService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArmorDto: UpdateArmorDto
  ): Promise<ArmorResponseDto> {
    return this.armorService.update(id, updateArmorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.armorService.remove(id);
  }
}
