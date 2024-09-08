import { Module } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { WeaponController } from './weapon.controller';
import { DatabaseModule } from '../database/database.module';

/**
 * WeaponModule is responsible for managing weapon-related features in the application.
 * It provides the `WeaponService` and the `WeaponController`.
 *
 * @module
 */
@Module({
  controllers: [WeaponController],
  providers: [WeaponService],
  imports: [DatabaseModule],
  exports: [WeaponService],
})
export class WeaponModule {}
