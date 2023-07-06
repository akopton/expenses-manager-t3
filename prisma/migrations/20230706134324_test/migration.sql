/*
  Warnings:

  - You are about to drop the column `count` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Product` table. All the data in the column will be lost.
  - Made the column `name` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Product" ("id", "name") SELECT "id", "name" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
