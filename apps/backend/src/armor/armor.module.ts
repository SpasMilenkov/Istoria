import { Module } from '@nestjs/common';
import { ArmorService } from './armor.service';
import { ArmorController } from './armor.controller';
import { DatabaseModule } from '../database/database.module';
import { ArmorSetController } from './armor-set.controller';
import { ArmorSetService } from './armor-set.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ArmorController, ArmorSetController],
  providers: [ArmorService, ArmorSetService],
  exports: [ArmorService, ArmorSetService],
})
export class ArmorModule {}
