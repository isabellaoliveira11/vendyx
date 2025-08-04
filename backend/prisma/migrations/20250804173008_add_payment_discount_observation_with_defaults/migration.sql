/*
  Warnings:

  - Added the required column `discount` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL DEFAULT 0, -- Adiciona DEFAULT 0 para desconto (número)
ADD COLUMN      "observation" TEXT,                                   -- Essa já está OK, aceita nulo
ADD COLUMN      "paymentMethod" TEXT NOT NULL DEFAULT 'Dinheiro';     -- Adiciona DEFAULT 'Dinheiro' (ou outro padrão) para forma de pagamento