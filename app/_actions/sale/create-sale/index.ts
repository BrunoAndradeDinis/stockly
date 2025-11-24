"use server";

import { db } from "@/app/_lib/prisma";
import { createSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const createSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { products } }) => {
    await db.$transaction(async (trx) => {
      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      });

      for (const product of products) {
        const productFromDb = await db.product.findUnique({
          where: { id: product.productId },
        });

        if (!productFromDb) {
          // throw new Error("Produto não encontrado!");
          returnValidationErrors(createSaleSchema, {
            _errors: ["Produto não encontrado!"],
          });
        }
        const productOutOfStock = productFromDb.stock < product.quantity;

        if (productOutOfStock) {
          returnValidationErrors(createSaleSchema, {
            _errors: [
              `Estoque insuficiente para o produto ${productFromDb.name}`,
            ],
          });
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
    revalidatePath("/sales");
  });

// export const createSale = async (data: CreateSaleSchema) => {
//   createSaleSchema.parse(data);

//   revalidatePath("/sales");
// };
