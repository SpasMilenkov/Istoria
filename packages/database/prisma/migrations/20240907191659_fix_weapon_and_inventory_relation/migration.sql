/*
  Warnings:

  - You are about to drop the column `weaponId` on the `Inventory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[equippedWeaponId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_weaponId_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "weaponId",
ADD COLUMN     "equippedWeaponId" TEXT;

-- AlterTable
ALTER TABLE "Weapon" ADD COLUMN     "inventoryId" TEXT;

-- CreateTable
CREATE TABLE "EquippedWeapon" (
    "id" TEXT NOT NULL,
    "weaponId" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,

    CONSTRAINT "EquippedWeapon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EquippedWeapon_inventoryId_key" ON "EquippedWeapon"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_equippedWeaponId_key" ON "Inventory"("equippedWeaponId");

-- AddForeignKey
ALTER TABLE "EquippedWeapon" ADD CONSTRAINT "EquippedWeapon_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquippedWeapon" ADD CONSTRAINT "EquippedWeapon_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
