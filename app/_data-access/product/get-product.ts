import "server-only";
import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
// import { unstable_cache } from "next/cache";
import { cache } from "react"; // esse cache aqui ele memoiza qualquer função, evitando de fazer uma segunda chamada por exemplo.

export const getProduct = async (): Promise<Product[]> => {
  console.log("Fazendo o Fetching de produtos...")
  return db.product.findMany({});
};

export const cachedGetProducts = cache(getProduct); // no caso o cache não está cacheando, ele esta garantindo que essa função seja executada somente 1 vez através da memoização
// export const cachedGetProducts = unstable_cache(getProduct, ["get-products"], {
//   revalidate: 5,
// });
