/*
  Warnings:

  - You are about to alter the column `slip` on the `FormSchema` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FormSchema" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "education" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "reason" TEXT,
    "slip" BLOB NOT NULL
);
INSERT INTO "new_FormSchema" ("education", "email", "firstname", "id", "lastname", "phone", "reason", "slip", "title") SELECT "education", "email", "firstname", "id", "lastname", "phone", "reason", "slip", "title" FROM "FormSchema";
DROP TABLE "FormSchema";
ALTER TABLE "new_FormSchema" RENAME TO "FormSchema";
CREATE UNIQUE INDEX "FormSchema_email_key" ON "FormSchema"("email");
PRAGMA foreign_key_check("FormSchema");
PRAGMA foreign_keys=ON;
