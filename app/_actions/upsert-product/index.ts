"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import {
  upsertProductSchema,
  type UpsertProductSchema,
} from "@/app/_actions/upsert-product/schema";

export const createProduct = async (data: UpsertProductSchema) => {
  upsertProductSchema.parse(data);
  // await new Promise((resolve) => setTimeout(resolve, 2000)); // um sleep para carregar o evento de post, no caso um atraso
  await db.product.upsert({
    where: { id: data?.id ?? "" },
    update: data,
    create: data,
  });

  revalidatePath("/products");
};
