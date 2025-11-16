"use server";

import { db } from "@/app/_lib/prisma";
import { createSaleSchema, CreateSaleSchema } from "./schema";

export const createSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);

  const sale = await db.sale.create({
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

    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.productId,
        quantity: product.quantity,
        unitPrice: productFromDb.price,
      },
    });

    await db.product.update({
      where: { id: product.productId },
      data: {
        stock: {
          decrement: product.quantity,
        },
      },
    });
  }
};
