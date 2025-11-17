"use server";

import { db } from "@/app/_lib/prisma";
import { createSaleSchema, CreateSaleSchema } from "./schema";

export const createSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);
  await db.$transaction(async (trx) => {
    const sale = await trx.sale.create({
      data: {
        date: new Date(),
      },
    });

    for (const product of data.products) {
      const productFromDb = await db.product.findUnique({
        where: { id: product.productId },
      });

      if (!productFromDb) {
        throw new Error("Produto não encontrado!");
      }
      const productOutOfStock = productFromDb.stock < product.quantity;

      if (productOutOfStock) {
        throw new Error(
          `Estoque insuficiente para o produto ${productFromDb.name}.`,
        );
      }

      await trx.saleProduct.create({
        data: {
          saleId: sale.id,
          productId: product.productId,
          quantity: product.quantity,
          unitPrice: productFromDb.price,
        },
      });

      await trx.product.update({
        where: { id: product.productId },
        data: {
          stock: {
            decrement: product.quantity,
          },
        },
      });
    }
  });
};
