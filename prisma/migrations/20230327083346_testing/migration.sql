/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Lesson_userId_date_available_key";

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_userId_date_key" ON "Lesson"("userId", "date");
