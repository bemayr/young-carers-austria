-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "lastUpdated" DATETIME,
    "owner" TEXT,
    CONSTRAINT "Reference_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Owner" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Reference" ("address_description", "address_onlineStatus", "address_openGraphData", "address_title", "address_url", "description", "id", "isPaidContent", "lastUpdated", "onlineStatus", "owner", "title", "url") SELECT "address_description", "address_onlineStatus", "address_openGraphData", "address_title", "address_url", "description", "id", "isPaidContent", "lastUpdated", "onlineStatus", "owner", "title", "url" FROM "Reference";
DROP TABLE "Reference";
ALTER TABLE "new_Reference" RENAME TO "Reference";
CREATE UNIQUE INDEX "Reference_url_key" ON "Reference"("url");
CREATE INDEX "Reference_owner_idx" ON "Reference"("owner");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
