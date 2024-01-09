/*
  Warnings:

  - A unique constraint covering the columns `[player]` on the table `PlayerPhotos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlayerPhotos_player_key" ON "PlayerPhotos"("player");

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_Player_fkey" FOREIGN KEY ("Player") REFERENCES "PlayerPhotos"("player") ON DELETE RESTRICT ON UPDATE CASCADE;
