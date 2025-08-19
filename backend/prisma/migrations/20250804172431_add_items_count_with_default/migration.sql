/*
  Warnings:

  - Added the required column `itemsCount` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Add missing column on existing table
ALTER TABLE "Sale" ADD COLUMN "itemsCount" INTEGER NOT NULL DEFAULT 0;