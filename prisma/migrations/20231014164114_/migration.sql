/*
  Warnings:

  - You are about to drop the column `DateCreated` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `package_collection` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `Coordinate` on the `RoutePath` table. All the data in the column will be lost.
  - You are about to drop the column `DateCreated` on the `RoutePath` table. All the data in the column will be lost.
  - Added the required column `dateCreated` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageCollection` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordinate` to the `RoutePath` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateCreated` to the `RoutePath` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Route` DROP COLUMN `DateCreated`,
    DROP COLUMN `package_collection`,
    ADD COLUMN `dateCreated` DATETIME(3) NOT NULL,
    ADD COLUMN `packageCollection` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `RoutePath` DROP COLUMN `Coordinate`,
    DROP COLUMN `DateCreated`,
    ADD COLUMN `coordinate` VARCHAR(191) NOT NULL,
    ADD COLUMN `dateCreated` DATETIME(3) NOT NULL;
