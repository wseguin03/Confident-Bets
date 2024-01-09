-- CreateTable
CREATE TABLE "PlayerPhotos" (
    "id" SERIAL NOT NULL,
    "player" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "PlayerPhotos_pkey" PRIMARY KEY ("id")
);
