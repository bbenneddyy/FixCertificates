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
    "status" TEXT NOT NULL DEFAULT 'pending'
);
INSERT INTO "new_FormSchema" ("education", "email", "firstname", "id", "lastname", "phone", "reason", "title") SELECT "education", "email", "firstname", "id", "lastname", "phone", "reason", "title" FROM "FormSchema";
DROP TABLE "FormSchema";
ALTER TABLE "new_FormSchema" RENAME TO "FormSchema";
CREATE UNIQUE INDEX "FormSchema_email_key" ON "FormSchema"("email");
PRAGMA foreign_key_check("FormSchema");
PRAGMA foreign_keys=ON;
