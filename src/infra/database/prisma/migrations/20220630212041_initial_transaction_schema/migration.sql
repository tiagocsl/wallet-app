-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "value" BIGINT NOT NULL,
    "origin" TEXT NOT NULL,
    "destiny" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "emission_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
