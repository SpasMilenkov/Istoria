import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { DatabaseModule } from 'src/database/database.module';
import { WeaponModule } from 'src/weapon/weapon.module';
import { ArmorModule } from 'src/armor/armor.module';

/**
 * @description The InventoryModule is responsible for managing the inventory-related functionalities.
 * It provides the necessary services and controllers for handling inventory operations and integrates
 * with other modules such as the WeaponModule and DatabaseModule.
 *
 * @module
 * @exports InventoryService - Provides the service for handling inventory operations.
 * @imports WeaponModule - Imports the WeaponModule to handle weapon-related functionalities.
 * @imports DatabaseModule - Imports the DatabaseModule for database access.
 */
@Module({
  /**
   * @description Registers the InventoryController to handle incoming HTTP requests related to inventory operations.
   */
  controllers: [InventoryController],

  /**
   * @description Registers the InventoryService which contains the business logic for inventory management.
   */
  providers: [InventoryService],

  /**
   * @description Imports modules required by InventoryModule:
   * - WeaponModule: Provides functionalities related to weapon management.
   * - DatabaseModule: Provides database connection and operations.
   * - ArmorModule: Provides functionalities related to armor management.
   */
  imports: [WeaponModule, DatabaseModule, ArmorModule],

  /**
   * @description Exports InventoryService to make it available to other modules that import InventoryModule.
   */
  exports: [InventoryService],
})
export class InventoryModule {}
