/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_id_fkey";

-- DropIndex
DROP INDEX "Project_organizationId_key";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "organizationId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_projectId_key" ON "Organization"("projectId");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
