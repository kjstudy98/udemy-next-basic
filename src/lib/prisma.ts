import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// prismaインスタンスがあれば使う
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 開発環境のみで使用
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
