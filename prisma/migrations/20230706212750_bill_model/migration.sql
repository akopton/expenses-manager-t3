/*
  Warnings:

  - You are about to alter the column `value` on the `Bill` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.
  - Added the required column `added_at` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPaid` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "billId" TEXT,
    CONSTRAINT "Product_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("count", "id", "name", "value") SELECT "count", "id", "name", "value" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Bill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "added_at" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    CONSTRAINT "Bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Bill" ("id", "name", "value") SELECT "id", "name", "value" FROM "Bill";
DROP TABLE "Bill";
ALTER TABLE "new_Bill" RENAME TO "Bill";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
