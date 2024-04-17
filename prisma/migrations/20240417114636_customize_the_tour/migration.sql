/*
  Warnings:

  - A unique constraint covering the columns `[city,country,tourType,duration]` on the table `Tour` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `duration` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tourType` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tour_city_country_key";

-- AlterTable
ALTER TABLE "Tour" ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "tourType" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tour_city_country_tourType_duration_key" ON "Tour"("city", "country", "tourType", "duration");
