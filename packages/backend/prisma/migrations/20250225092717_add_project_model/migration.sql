/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'My project',
    "organizationId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_organizationId_key" ON "Project"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_id_key" ON "Organization"("id");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_id_fkey" FOREIGN KEY ("id") REFERENCES "Project"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
