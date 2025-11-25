import "server-only";
import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
// import { unstable_cache } from "next/cache";
import { cache } from "react"; // esse cache aqui ele memoiza qualquer função, evitando de fazer uma segunda chamada por exemplo.

export interface ProductsDTO extends Product {
  status: "IN_STOCK" | "OUT_OF_STOCK";
}

export const getProducts = async (): Promise<ProductsDTO[]> => {
  const products = await db.product.findMany({});
  return products.map((product) => ({
    ...product,
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};

export const cachedGetProducts = cache(getProducts); // no caso o cache não está cacheando, ele esta garantindo que essa função seja executada somente 1 vez através da memoização
// export const cachedGetProducts = unstable_cache(getProduct, ["get-products"], {
//   revalidate: 5,
// });
