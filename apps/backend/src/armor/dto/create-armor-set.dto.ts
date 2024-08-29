import { IsString, IsUUID, IsOptional, IsArray } from 'class-validator';

export class CreateArmorSetDto {
  @IsString()
  name: string;

  @IsArray()
  @IsUUID(4, { each: true })
  @IsOptional()
  setBonus?: string[];

  @IsArray()
  @IsUUID(4, { each: true })
  @IsOptional()
  buffs?: string[];

  @IsArray()
  @IsUUID(4, { each: true })
  @IsOptional()
  debuffs?: string[];
}
