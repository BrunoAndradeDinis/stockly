"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import {
  createProductSchema,
  type CreateProductSchema,
} from "@/app/_actions/create-product/schema";

export const createProduct = async (data: CreateProductSchema) => {
  createProductSchema.parse(data);
  // await new Promise((resolve) => setTimeout(resolve, 2000)); // um sleep para carregar o evento de post, no caso um atraso
  await db.product.create({
    data,
  });

  revalidatePath("/products");
};
