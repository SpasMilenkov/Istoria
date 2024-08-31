import { Module } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { WeaponController } from './weapon.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [WeaponController],
  providers: [WeaponService],
  imports: [DatabaseModule],
  exports: [WeaponService],
})
export class WeaponModule {}
