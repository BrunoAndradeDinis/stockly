"server only";
import dayjs from "dayjs";
import { db } from "@/app/_lib/prisma";

export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}

interface DashboardDTO {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
  totalLast14DaysRevenue: DayTotalRevenue[];
}

export const getDashboardData = async (): Promise<DashboardDTO> => {
  const today = dayjs().endOf("day").toDate();
  const last14days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(
    (day) => {
      return dayjs(today).subtract(day, "day");
    },
  );
  const totalLast14DaysRevenue: DayTotalRevenue[] = [];

  for (const day of last14days) {
    const dayTotalRevenue = await db.$queryRawUnsafe<
      { totalRevenue: string | null }[]
    >(
      `SELECT SUM("unitPrice" * "quantity") as "totalRevenue" FROM "SaleProduct" 
    WHERE "createdAt" > $1 AND "createdAt" < $2;`,
      day.startOf("day").toDate(),
      day.endOf("day").toDate(),
    );
    totalLast14DaysRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue: Number(dayTotalRevenue?.[0]?.totalRevenue ?? 0) || 0,
    });
  }

  const totalRevenueQuery = `SELECT SUM("unitPrice" * "quantity") as "totalRevenue" FROM "SaleProduct";`;

  const todayRevenueQuery = `SELECT SUM("unitPrice" * "quantity") as "todayRevenue" FROM "SaleProduct" 
  WHERE "createdAt" > $1 AND "createdAt" < $2;`;

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const totalRevenuePromise =
    db.$queryRawUnsafe<{ totalRevenue: string | null }[]>(totalRevenueQuery);
  const todayRevenuePromise = db.$queryRawUnsafe<
    { todayRevenue: string | null }[]
  >(todayRevenueQuery, startOfDay, endOfDay);
  const totalSalesPromise = db.sale.count();
  const totalStockPromise = db.product.aggregate({
    _sum: {
      stock: true,
    },
  });
  const totalProductsPromise = db.product.count();

  const [
    totalRevenueResult,
    todayRevenueResult,
    totalSales,
    totalStock,
    totalProducts,
  ] = await Promise.all([
    totalRevenuePromise,
    todayRevenuePromise,
    totalSalesPromise,
    totalStockPromise,
    totalProductsPromise,
  ]);

  const totalRevenueValue =
    Number(totalRevenueResult?.[0]?.totalRevenue ?? 0) || 0;
  const todayRevenueValue =
    Number(todayRevenueResult?.[0]?.todayRevenue ?? 0) || 0;

  return {
    totalRevenue: totalRevenueValue,
    todayRevenue: todayRevenueValue,
    totalSales,
    totalStock: Number(totalStock._sum.stock) || 0,
    totalProducts,
    totalLast14DaysRevenue,
  };
};
