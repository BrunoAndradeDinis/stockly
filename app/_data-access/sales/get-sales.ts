import "server-only";

import { db } from "@/app/_lib/prisma";
import { cache } from "react";

export interface SalesDTO {
  id: string;
  productNames: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
}

export const getSales = async (): Promise<SalesDTO[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return sales.map(
    (sale): SalesDTO => ({
      id: sale.id,
      date: sale.date,
      productNames: sale.saleProducts
        .map((saleProduct) => saleProduct.product.name)
        .join(" • "),
      totalAmount: sale.saleProducts.reduce(
        (acc, saleProduct) =>
          acc + saleProduct.quantity * Number(saleProduct.unitPrice),
        0,
      ),
      totalProducts: sale.saleProducts.reduce(
        (acc, saleProduct) => acc + saleProduct.quantity,
        0,
      ),
    }),
  );
};

export const cachedGetSales = cache(getSales);
