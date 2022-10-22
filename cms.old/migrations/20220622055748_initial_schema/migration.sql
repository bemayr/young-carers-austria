-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "information" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "renderedInformation" TEXT NOT NULL DEFAULT '',
    "lastUpdated" DATETIME
);

-- CreateTable
CREATE TABLE "Reference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "address_url" TEXT,
    "address_onlineStatus" TEXT,
    "address_openGraphData" TEXT,
    "address_title" TEXT,
    "address_description" TEXT,
    "onlineStatus" TEXT,
    "isPaidContent" BOOLEAN NOT NULL DEFAULT false,
    "lastUpdated" DATETIME,
    "owner" TEXT,
    CONSTRAINT "Reference_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Owner" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Singleton" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "renderedContent" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Category_references" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Reference" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Category_keywords" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Reference_keywords" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Reference" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Reference_url_key" ON "Reference"("url");

-- CreateIndex
CREATE INDEX "Reference_owner_idx" ON "Reference"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_name_key" ON "Owner"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_name_key" ON "Keyword"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Singleton_name_key" ON "Singleton"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_references_AB_unique" ON "_Category_references"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_references_B_index" ON "_Category_references"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_keywords_AB_unique" ON "_Category_keywords"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_keywords_B_index" ON "_Category_keywords"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Reference_keywords_AB_unique" ON "_Reference_keywords"("A", "B");

-- CreateIndex
CREATE INDEX "_Reference_keywords_B_index" ON "_Reference_keywords"("B");
