/*
  Warnings:

  - You are about to drop the `FormSchema` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FormSchema";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "education" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "reason" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending'
);

-- CreateIndex
CREATE UNIQUE INDEX "Registration_email_key" ON "Registration"("email");
