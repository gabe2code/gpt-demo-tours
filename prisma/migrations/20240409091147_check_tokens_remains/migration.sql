-- CreateTable
CREATE TABLE "Token" (
    "clerkId" TEXT NOT NULL,
    "tokens" INTEGER NOT NULL DEFAULT 1000,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("clerkId")
);
