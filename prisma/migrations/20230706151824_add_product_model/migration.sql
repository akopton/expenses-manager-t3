/*
  Warnings:

  - Added the required column `value` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Product" ("count", "id", "name") SELECT "count", "id", "name" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
