/*
  Warnings:

  - You are about to drop the column `agility` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `attributes` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `defense` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `origin` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `rarity` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `requiredLevel` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `speed` on the `Weapon` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Weapon` table. All the data in the column will be lost.
  - Made the column `userId` on table `Character` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Weight" AS ENUM ('LIGHT', 'MEDIUM', 'HEAVY', 'SUPER_HEAVY');

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_userId_fkey";

-- DropForeignKey
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_creatorId_fkey";

-- DropIndex
DROP INDEX "Weapon_creatorId_key";

-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Weapon" DROP COLUMN "agility",
DROP COLUMN "attributes",
DROP COLUMN "createdAt",
DROP COLUMN "creatorId",
DROP COLUMN "defense",
DROP COLUMN "name",
DROP COLUMN "origin",
DROP COLUMN "rarity",
DROP COLUMN "requiredLevel",
DROP COLUMN "speed",
DROP COLUMN "updatedAt",
ADD COLUMN     "characterId" TEXT;

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "attributes" "Attribute"[],
    "rarity" "Rarity" NOT NULL,
    "defense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "requiredLevel" INTEGER NOT NULL,
    "origin" TEXT NOT NULL,
    "creatorId" TEXT,
    "weight" "Weight" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armor" (
    "id" TEXT NOT NULL,
    "armorSetId" TEXT NOT NULL,
    "characterId" TEXT,

    CONSTRAINT "Armor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArmorSet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ArmorSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArmorSetToTrait" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArmorSetToBuff" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArmorSetToDebuff" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_creatorId_key" ON "Item"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "_ArmorSetToTrait_AB_unique" ON "_ArmorSetToTrait"("A", "B");

-- CreateIndex
CREATE INDEX "_ArmorSetToTrait_B_index" ON "_ArmorSetToTrait"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArmorSetToBuff_AB_unique" ON "_ArmorSetToBuff"("A", "B");

-- CreateIndex
CREATE INDEX "_ArmorSetToBuff_B_index" ON "_ArmorSetToBuff"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArmorSetToDebuff_AB_unique" ON "_ArmorSetToDebuff"("A", "B");

-- CreateIndex
CREATE INDEX "_ArmorSetToDebuff_B_index" ON "_ArmorSetToDebuff"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_id_fkey" FOREIGN KEY ("id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Armor" ADD CONSTRAINT "Armor_armorSetId_fkey" FOREIGN KEY ("armorSetId") REFERENCES "ArmorSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Armor" ADD CONSTRAINT "Armor_id_fkey" FOREIGN KEY ("id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Armor" ADD CONSTRAINT "Armor_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorSetToTrait" ADD CONSTRAINT "_ArmorSetToTrait_A_fkey" FOREIGN KEY ("A") REFERENCES "ArmorSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorSetToTrait" ADD CONSTRAINT "_ArmorSetToTrait_B_fkey" FOREIGN KEY ("B") REFERENCES "Trait"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorSetToBuff" ADD CONSTRAINT "_ArmorSetToBuff_A_fkey" FOREIGN KEY ("A") REFERENCES "ArmorSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorSetToBuff" ADD CONSTRAINT "_ArmorSetToBuff_B_fkey" FOREIGN KEY ("B") REFERENCES "Buff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorSetToDebuff" ADD CONSTRAINT "_ArmorSetToDebuff_A_fkey" FOREIGN KEY ("A") REFERENCES "ArmorSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorSetToDebuff" ADD CONSTRAINT "_ArmorSetToDebuff_B_fkey" FOREIGN KEY ("B") REFERENCES "Debuff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
