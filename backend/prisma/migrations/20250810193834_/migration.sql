/*
  Warnings:

  - You are about to drop the column `clientName` on the `Sale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "clientName",
ADD COLUMN     "clientId" TEXT,
ALTER COLUMN "discount" DROP NOT NULL,
ALTER COLUMN "paymentMethod" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
