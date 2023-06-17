/*
  Warnings:

  - You are about to drop the `_BlogPostToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BlogPostToCategory" DROP CONSTRAINT "_BlogPostToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogPostToCategory" DROP CONSTRAINT "_BlogPostToCategory_B_fkey";

-- DropTable
DROP TABLE "_BlogPostToCategory";

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
