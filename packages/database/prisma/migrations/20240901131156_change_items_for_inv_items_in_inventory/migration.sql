/*
  Warnings:

  - You are about to drop the column `inventoryId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_inventoryId_fkey";

-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "inventoryId" TEXT;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "inventoryId";

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
