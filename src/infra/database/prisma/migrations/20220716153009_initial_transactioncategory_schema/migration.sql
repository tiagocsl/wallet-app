-- CreateEnum
CREATE TYPE "TRANSACTION_CATEGORY_TYPE" AS ENUM ('Despesa', 'Renda');

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "TransactionCategory" (
    "id" SERIAL NOT NULL,
    "type" "TRANSACTION_CATEGORY_TYPE" NOT NULL,
    "name" TEXT NOT NULL,
    "real_value" DOUBLE PRECISION NOT NULL,
    "planned_value" DOUBLE PRECISION NOT NULL,
    "difference_value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionCategory_pkey" PRIMARY KEY ("id")
);
