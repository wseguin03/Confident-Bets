-- AlterTable
ALTER TABLE "PlayerStats" ALTER COLUMN "FG_Percentage" DROP NOT NULL,
ALTER COLUMN "ThreeP_Percentage" DROP NOT NULL,
ALTER COLUMN "TwoP_Percentage" DROP NOT NULL,
ALTER COLUMN "eFG_Percentage" DROP NOT NULL,
ALTER COLUMN "FT_Percentage" DROP NOT NULL;