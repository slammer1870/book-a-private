/*
  Warnings:

  - You are about to drop the column `instructorId` on the `Lesson` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,date]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `Lesson` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_instructorId_fkey";

-- DropIndex
DROP INDEX "Lesson_instructorId_date_key";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "instructorId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'unbooked';

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_userId_date_key" ON "Lesson"("userId", "date");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
