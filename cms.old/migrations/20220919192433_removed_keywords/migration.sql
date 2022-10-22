/*
  Warnings:

  - You are about to drop the `Keyword` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Category_keywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Reference_keywords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Keyword_name_key";

-- DropIndex
DROP INDEX "_Category_keywords_B_index";

-- DropIndex
DROP INDEX "_Category_keywords_AB_unique";

-- DropIndex
DROP INDEX "_Reference_keywords_B_index";

-- DropIndex
DROP INDEX "_Reference_keywords_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Keyword";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_Category_keywords";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_Reference_keywords";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "information" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "renderedInformation" TEXT NOT NULL DEFAULT '',
    "keywords" TEXT NOT NULL DEFAULT '',
    "lastUpdated" DATETIME
);
INSERT INTO "new_Category" ("id", "information", "lastUpdated", "name", "renderedInformation", "title") SELECT "id", "information", "lastUpdated", "name", "renderedInformation", "title" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
CREATE TABLE "new_Reference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "previewImageUrl" TEXT NOT NULL DEFAULT '',
    "address_url" TEXT,
    "address_onlineStatus" TEXT,
    "address_openGraphData" TEXT,
    "address_title" TEXT,
    "address_description" TEXT,
    "onlineStatus" TEXT,
    "isPaidContent" BOOLEAN NOT NULL DEFAULT false,
    "keywords" TEXT NOT NULL DEFAULT '',
    "lastUpdated" DATETIME,
    "owner" TEXT,
    CONSTRAINT "Reference_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Owner" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Reference" ("address_description", "address_onlineStatus", "address_openGraphData", "address_title", "address_url", "description", "id", "isPaidContent", "lastUpdated", "onlineStatus", "owner", "previewImageUrl", "title", "url") SELECT "address_description", "address_onlineStatus", "address_openGraphData", "address_title", "address_url", "description", "id", "isPaidContent", "lastUpdated", "onlineStatus", "owner", "previewImageUrl", "title", "url" FROM "Reference";
DROP TABLE "Reference";
ALTER TABLE "new_Reference" RENAME TO "Reference";
CREATE UNIQUE INDEX "Reference_url_key" ON "Reference"("url");
CREATE INDEX "Reference_owner_idx" ON "Reference"("owner");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
