import { PartialType } from '@nestjs/mapped-types';
import { CreateArmorSetDto } from './create-armor-set.dto';

export class UpdateArmorSetDto extends PartialType(CreateArmorSetDto) {}
