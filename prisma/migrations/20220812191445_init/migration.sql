-- CreateTable
CREATE TABLE `Task` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(60) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM('ON_HOLD', 'ON_PROGRESS', 'PENDING', 'COMPLETED') NOT NULL DEFAULT 'ON_PROGRESS',
    `isDelete` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
