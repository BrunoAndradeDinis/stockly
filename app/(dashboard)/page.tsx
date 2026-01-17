import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import { Suspense } from "react";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Skeleton } from "../_components/ui/skeleton";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalStockCard from "./_components/total-stock-card";
import TotalProductsCard from "./_components/total-products-card";
import Last14DaysRevenueCard from "./_components/last-14-days-revenue-card";
import MostSoldProductsCard, { MostSoldProductsCardSkeleton } from "./_components/most-sold-products-card";

const Home = async () => {
  return (
    <div className="mx-8 my-8 flex flex-col space-y-8 rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={
          <Skeleton className="bg-white p-6">
            <div className="space-y-2">
              <div className="h-10 w-16 rounded-md bg-gray-200"></div>
              <div className="h-4 w-28 rounded-md bg-gray-200"></div>
              <div className="h-4 w-36 rounded-md bg-gray-200"></div>
            </div>
          </Skeleton>}>
          <TotalRevenueCard />
        </Suspense>
        <Suspense fallback={
         <Skeleton className="bg-white p-6">
            <div className="space-y-2">
              <div className="h-10 w-16 rounded-md bg-gray-200"></div>
              <div className="h-4 w-28 rounded-md bg-gray-200"></div>
              <div className="h-4 w-36 rounded-md bg-gray-200"></div>
            </div>
          </Skeleton>}>
          <TodayRevenueCard />
        </Suspense>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<Skeleton className="bg-white p-6">
            <div className="space-y-2">
              <div className="h-10 w-16 rounded-md bg-gray-200"></div>
              <div className="h-4 w-28 rounded-md bg-gray-200"></div>
              <div className="h-4 w-36 rounded-md bg-gray-200"></div>
            </div>
          </Skeleton>}>
          <TotalSalesCard />
        </Suspense>
        <Suspense fallback={<Skeleton className="bg-white p-6">
            <div className="space-y-2">
              <div className="h-10 w-16 rounded-md bg-gray-200"></div>
              <div className="h-4 w-28 rounded-md bg-gray-200"></div>
              <div className="h-4 w-36 rounded-md bg-gray-200"></div>
            </div>
          </Skeleton>}>
          <TotalStockCard />
        </Suspense>
        <Suspense fallback={<Skeleton className="bg-white p-6">
            <div className="space-y-2">
              <div className="h-10 w-16 rounded-md bg-gray-200"></div>
              <div className="h-4 w-28 rounded-md bg-gray-200"></div>
              <div className="h-4 w-36 rounded-md bg-gray-200"></div>
            </div>
          </Skeleton>}>
          <TotalProductsCard />
        </Suspense>
      </div>
      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <Suspense fallback={
          <Skeleton className="bg-white p-6">
           <div className="space-y-2">
            <div className="h-5 w-[86.26px] rounded-md bg-gray-200"></div>
            <div className="h-4 w-48 rounded-md bg-gray-200"></div>
           </div>
          </Skeleton>
        }>
          <Last14DaysRevenueCard />
        </Suspense>
        <Suspense fallback={
          <MostSoldProductsCardSkeleton />
        }>
          <MostSoldProductsCard />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
