
import { db } from "@/app/_lib/prisma";

export const getTotalRevenue = async (): Promise<number> => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const totalRevenueQuery = `
    SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
    FROM "SaleProduct"
    JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id";
    `;
    const totalRevenuePromise =
        db.$queryRawUnsafe<{ totalRevenue: number }[]>(totalRevenueQuery);
    const totalRevenue = await totalRevenuePromise;
    return totalRevenue[0].totalRevenue;
}