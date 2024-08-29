import { PartialType } from '@nestjs/mapped-types';
import { CreateArmorDto } from './create-armor.dto';

export class UpdateArmorDto extends PartialType(CreateArmorDto) {}
