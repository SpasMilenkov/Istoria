import { PartialType } from '@nestjs/mapped-types';
import { CreateWeaponDto } from './create-weapon.dto';

export class UpdateWeaponDto extends PartialType(CreateWeaponDto) {}
