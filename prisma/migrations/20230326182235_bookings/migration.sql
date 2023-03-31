/*
  Warnings:

  - You are about to drop the column `status` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `stripePaymentIntentId` on the `Lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "status",
DROP COLUMN "stripePaymentIntentId",
ADD COLUMN     "booked" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "stripePaymentIntent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
