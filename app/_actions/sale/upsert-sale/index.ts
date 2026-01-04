"use server";

import { db } from "@/app/_lib/prisma";
import { upsertSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const upsertSale = actionClient
  .schema(upsertSaleSchema)
  .action(async ({ parsedInput: { products, id } }) => {
    const isUpdate = Boolean(id);

    await db.$transaction(async (trx) => {
      if (isUpdate) {
        const existingSale = await trx.sale.findUnique({
          where: { id },
          include: { saleProducts: true },
        });

        if (!existingSale) return;
        await trx.sale.delete({
          where: { id },
        });
        for (const product of existingSale.saleProducts) {
          await trx.product.update({
            where: { id: product.productId },
            data: {
              stock: {
                increment: product.quantity,
              },
            },
          });
        }
      }
      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      });

      for (const product of products) {
        const productFromDb = await trx.product.findUnique({
          where: { id: product.productId },
        });

        if (!productFromDb) {
          // throw new Error("Produto não encontrado!");
          returnValidationErrors(upsertSaleSchema, {
            _errors: ["Produto não encontrado!"],
          });
        }
        const productOutOfStock = productFromDb.stock < product.quantity;

        if (productOutOfStock) {
          returnValidationErrors(upsertSaleSchema, {
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
    revalidatePath("/", "layout");
  });

// export const upsertSale = async (data: UpsertSaleSchema) => {
//   upsertSaleSchema.parse(data);

revalidatePath("/sales");
// };
