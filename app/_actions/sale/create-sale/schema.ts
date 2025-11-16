import { z } from "zod";

export const createSaleSchema = z.object({
  products: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});
export type CreateSaleSchema = z.infer<typeof createSaleSchema>;
