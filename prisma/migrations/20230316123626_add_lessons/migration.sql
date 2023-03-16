-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT,
    "stripePaymentIntentId" TEXT,
    "instructorId" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_instructorId_date_key" ON "Lesson"("instructorId", "date");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
