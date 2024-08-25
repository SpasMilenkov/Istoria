-- CreateEnum
CREATE TYPE "Attribute" AS ENUM ('LIGHT_ATTRIBUTE', 'DARK_ATTRIBUTE', 'FIRE_ATTRIBUTE', 'WATER_ATTRIBUTE', 'EARTH_ATTRIBUTE', 'WIND_ATTRIBUTE');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHICAL', 'HYPOTHETICAL');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD', 'EXTREMELY_HARD', 'HEROIC_DEED', 'WORLD_ENDING_THREAT', 'BEYOND_HUMAN_COMPREHENSION');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('MILD', 'MEDIUM', 'HIGH', 'EXTREME');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "attributes" "Attribute"[],
    "rarity" "Rarity" NOT NULL,
    "baseAttack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "requiredLevel" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "race" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "hp" INTEGER NOT NULL,
    "mana" INTEGER NOT NULL,
    "stamina" INTEGER NOT NULL,
    "poise" INTEGER NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "partyId" TEXT,
    "titles" TEXT[],
    "characterTraitId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Debuff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "severity" "Severity" NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "obtain" TEXT NOT NULL,
    "remove" TEXT,

    CONSTRAINT "Debuff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "severity" "Severity" NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "obtain" TEXT NOT NULL,

    CONSTRAINT "Buff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "severity" "Severity" NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "obtain" TEXT NOT NULL,
    "remove" TEXT,

    CONSTRAINT "Curse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blessing" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "severity" "Severity" NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "obtain" TEXT NOT NULL,

    CONSTRAINT "Blessing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trait" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "severity" "Severity" NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "obtain" TEXT NOT NULL,
    "remove" TEXT,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "equippedWeapon" JSONB NOT NULL,
    "equippedArmor" JSONB NOT NULL,
    "equippedTrinkets" JSONB NOT NULL,
    "inventoryItems" JSONB NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterTrait" (
    "id" TEXT NOT NULL,
    "strength" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "constitution" INTEGER NOT NULL,
    "intelligence" INTEGER NOT NULL,
    "empathy" INTEGER NOT NULL,
    "willpower" INTEGER NOT NULL,
    "awareness" INTEGER NOT NULL,

    CONSTRAINT "CharacterTrait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "id" TEXT NOT NULL,
    "partyName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterDebuffs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterCurses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterTraits" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToCharacterTrait" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterBuffs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterBlessings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_inventoryId_key" ON "Character"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterDebuffs_AB_unique" ON "_CharacterDebuffs"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterDebuffs_B_index" ON "_CharacterDebuffs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterCurses_AB_unique" ON "_CharacterCurses"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterCurses_B_index" ON "_CharacterCurses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterTraits_AB_unique" ON "_CharacterTraits"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterTraits_B_index" ON "_CharacterTraits"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToCharacterTrait_AB_unique" ON "_CharacterToCharacterTrait"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToCharacterTrait_B_index" ON "_CharacterToCharacterTrait"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterBuffs_AB_unique" ON "_CharacterBuffs"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterBuffs_B_index" ON "_CharacterBuffs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterBlessings_AB_unique" ON "_CharacterBlessings"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterBlessings_B_index" ON "_CharacterBlessings"("B");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterDebuffs" ADD CONSTRAINT "_CharacterDebuffs_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterDebuffs" ADD CONSTRAINT "_CharacterDebuffs_B_fkey" FOREIGN KEY ("B") REFERENCES "Debuff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterCurses" ADD CONSTRAINT "_CharacterCurses_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterCurses" ADD CONSTRAINT "_CharacterCurses_B_fkey" FOREIGN KEY ("B") REFERENCES "Curse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterTraits" ADD CONSTRAINT "_CharacterTraits_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterTraits" ADD CONSTRAINT "_CharacterTraits_B_fkey" FOREIGN KEY ("B") REFERENCES "Trait"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToCharacterTrait" ADD CONSTRAINT "_CharacterToCharacterTrait_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToCharacterTrait" ADD CONSTRAINT "_CharacterToCharacterTrait_B_fkey" FOREIGN KEY ("B") REFERENCES "CharacterTrait"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterBuffs" ADD CONSTRAINT "_CharacterBuffs_A_fkey" FOREIGN KEY ("A") REFERENCES "Buff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterBuffs" ADD CONSTRAINT "_CharacterBuffs_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterBlessings" ADD CONSTRAINT "_CharacterBlessings_A_fkey" FOREIGN KEY ("A") REFERENCES "Blessing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterBlessings" ADD CONSTRAINT "_CharacterBlessings_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
