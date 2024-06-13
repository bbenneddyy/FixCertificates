-- CreateTable
CREATE TABLE "FormSchema" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "education" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "reason" TEXT,
    "slip" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FormSchema_email_key" ON "FormSchema"("email");
