-- CreateTable
CREATE TABLE "BlastGate" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlastGate_pkey" PRIMARY KEY ("id")
);
