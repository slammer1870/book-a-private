/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Lesson_id_key" ON "Lesson"("id");
