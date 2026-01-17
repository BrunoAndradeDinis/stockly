import { getMostSoldProducts } from "@/app/_data-access/dashboard/get-most-sold-products";
import MostSoldProductItem from "./most-sold-product-item";
import { Skeleton } from "@/app/_components/ui/skeleton";

const MostSoldProductsCard = async () => {
    const mostSoldProducts = await getMostSoldProducts();
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
          <p className="text-lg font-semibold text-slate-900 p-6">Produtos mais vendidos</p>

          <div className="overflow-y-auto space-y-7 overflow-y-auto px-6 pb-6">
            {mostSoldProducts.map((product) => (
              <MostSoldProductItem key={product.productId} product={product} />
            ))}
          </div>
        </div>
    );
};

export const MostSoldProductsCardSkeleton = () => {
    return (
        <Skeleton className="bg-white p-6">
          <div className="h-6 w-56 rounded-md bg-gray-200 mb-8 mt-4"></div>
            <div className="space-y-2 mt-8"> 
              <div className="h-4 w-24 rounded-md bg-gray-200"></div>
              <div className="flex justify-between">
                <div className="h-4 w-20 rounded-md bg-gray-200"></div>
                <div className="h-4 w-20 rounded-md bg-gray-200"></div>
              </div>
              <div className="h-4 w-36 rounded-md bg-gray-200"></div>
            </div>
             <div className="space-y-2 mt-8"> 
              <div className="h-4 w-24 rounded-md bg-gray-200"></div>
              <div className="flex justify-between">
                <div className="h-4 w-20 rounded-md bg-gray-200"></div>
                <div className="h-4 w-20 rounded-md bg-gray-200"></div>
              </div>
              <div className="h-4 w-36 rounded-md bg-gray-200"></div>
            </div>
          </Skeleton>
    );
};

export default MostSoldProductsCard;

