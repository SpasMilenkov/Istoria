import { Module } from '@nestjs/common';
import { ArmorService } from './armor.service';
import { ArmorController } from './armor.controller';
import { DatabaseModule } from '../database/database.module';
import { ArmorSetController } from './armor-set.controller';
import { ArmorSetService } from './armor-set.service';

/**
 * @description The ArmorModule is a NestJS module responsible for managing armor-related functionalities.
 * It integrates with the DatabaseModule for database interactions and includes controllers and services for managing both individual armor items and armor sets.
 */
@Module({
  /**
   * @description Imports the DatabaseModule, which provides the necessary database interactions for the armor functionalities.
   */
  imports: [DatabaseModule],

  /**
   * @description Registers the controllers for managing armor items and armor sets.
   * These controllers handle HTTP requests related to armor and armor sets.
   */
  controllers: [ArmorController, ArmorSetController],

  /**
   * @description Provides the services used to manage armor items and armor sets.
   * These services encapsulate the business logic for interacting with armor records.
   */
  providers: [ArmorService, ArmorSetService],

  /**
   * @description Exports the ArmorService and ArmorSetService so that they can be used in other modules that import the ArmorModule.
   */
  exports: [ArmorService, ArmorSetService],
})
export class ArmorModule {}
