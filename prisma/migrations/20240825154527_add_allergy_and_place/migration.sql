/*
  Warnings:

  - You are about to drop the column `sessionFive` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `sessionFour` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `sessionOne` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `sessionSix` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `sessionThree` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `sessionTwo` on the `Registration` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Registration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "education" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "allergy" TEXT,
    "place" TEXT NOT NULL,
    "reason" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_type" TEXT
);
INSERT INTO "new_Registration" ("allergy", "created_at", "education", "email", "file_type", "firstname", "id", "lastname", "phone", "place", "reason", "status", "title") SELECT "allergy", "created_at", "education", "email", "file_type", "firstname", "id", "lastname", "phone", "place", "reason", "status", "title" FROM "Registration";
DROP TABLE "Registration";
ALTER TABLE "new_Registration" RENAME TO "Registration";
CREATE UNIQUE INDEX "Registration_email_key" ON "Registration"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
