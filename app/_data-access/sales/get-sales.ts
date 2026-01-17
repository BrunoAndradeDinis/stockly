import "server-only";

import { db } from "@/app/_lib/prisma";
import { cache } from "react";
// import { SaleProduct } from "@prisma/client";

interface SaleProductDTO {
  id: string;
  name: string;
  quantity: number;
  productId: string;
  unitPrice: number;
  productName: string;
}
export interface SalesDTO {
  id: string;
  productNames: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
  saleProducts: SaleProductDTO[];
}

export const getSales = async (): Promise<SalesDTO[]> => {
  const sales = await db.sale.findMany({
    include: {
      products: {
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
      productNames: sale.products
        .map((saleProduct) => saleProduct.product.name)
        .join(" • "),
      totalAmount: sale.products.reduce(
        (acc, saleProduct) =>
          acc + saleProduct.quantity * Number(saleProduct.unitPrice),
        0,
      ),
      totalProducts: sale.products.reduce(
        (acc, saleProduct) => acc + saleProduct.quantity,
        0,
      ),
      saleProducts: sale.products.map(
        (saleProduct): SaleProductDTO => ({
          id: saleProduct.id,
          name: saleProduct.product.name,
          quantity: saleProduct.quantity,
          productId: saleProduct.productId,
          unitPrice: Number(saleProduct.unitPrice),
          productName: saleProduct.product.name,
        }),
      ),
    }),
  );
};

export const cachedGetSales = cache(getSales);
