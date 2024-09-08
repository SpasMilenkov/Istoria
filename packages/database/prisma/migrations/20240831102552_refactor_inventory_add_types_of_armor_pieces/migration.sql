/*
  Warnings:

  - You are about to drop the column `equippedArmor` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `equippedTrinkets` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `equippedWeapon` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryItems` on the `Inventory` table. All the data in the column will be lost.
  - Added the required column `armorPiece` to the `Armor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weaponId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ArmorPiece" AS ENUM ('HELMET', 'CHESTPLATE', 'GREAVES', 'BOOTS', 'ROBE');

-- AlterTable
ALTER TABLE "Armor" ADD COLUMN     "armorPiece" "ArmorPiece" NOT NULL;

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "equippedArmor",
DROP COLUMN "equippedTrinkets",
DROP COLUMN "equippedWeapon",
DROP COLUMN "inventoryItems",
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "weaponId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "inventoryId" TEXT;

-- CreateTable
CREATE TABLE "_ArmorToInventory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArmorToInventory_AB_unique" ON "_ArmorToInventory"("A", "B");

-- CreateIndex
CREATE INDEX "_ArmorToInventory_B_index" ON "_ArmorToInventory"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorToInventory" ADD CONSTRAINT "_ArmorToInventory_A_fkey" FOREIGN KEY ("A") REFERENCES "Armor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorToInventory" ADD CONSTRAINT "_ArmorToInventory_B_fkey" FOREIGN KEY ("B") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
