import {
  CircleDollarSign,
  DollarSign,
  Package,
  ShoppingBasketIcon,
} from "lucide-react";
import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-card";
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import { formatCurrency } from "../_helpers/currency";
import dynamic from "next/dynamic";
import MostSoldProductItem from "./_components/most-sold-product-item";
import { Suspense } from "react";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Skeleton } from "../_components/ui/skeleton";
import { getTotalRevenue } from "../_data-access/dashboard/get-total-revenue";

const RevenueChart = dynamic(() => import("./_components/revenue-chart"), {
  ssr: false,
});

const Home = async () => {
  const {
    todayRevenue,
    totalProducts,
    totalSales,
    totalStock,
    totalLast14DaysRevenue,
    mostSoldProducts,
  } = await getDashboard();
  const totalRevenue = await getTotalRevenue();
  return (
    <div className="mx-8 my-8 flex flex-col space-y-8 rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<Skeleton className="h-full w-full bg-white bg-opacity-75 rounded-xl" />}>
          <TotalRevenueCard />
        </Suspense>
        <SummaryCard>
          <SummaryCardIcon>
            <DollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>Receita hoje</SummaryCardTitle>
          <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardIcon>
            <DollarSign className="text-emerald-500"/>
          </SummaryCardIcon>
          <SummaryCardTitle>Receita Total </SummaryCardTitle>
          <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
        </SummaryCard>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <CircleDollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
          <SummaryCardValue>{totalSales}</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardIcon>
            <Package />
          </SummaryCardIcon>
          <SummaryCardTitle>Total em estoque</SummaryCardTitle>
          <SummaryCardValue>{totalStock}</SummaryCardValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Produtos</SummaryCardTitle>
          <SummaryCardValue>{totalProducts}</SummaryCardValue>
        </SummaryCard>
      </div>
      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
          <p className="text-lg text-sm font-semibold text-slate-900">Receita </p>
          <p className="text-sm text-slate-400">Últimos 14 dias</p>

          <RevenueChart data={totalLast14DaysRevenue} />
        </div>
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
          <p className="text-lg font-semibold text-slate-900 p-6">Produtos mais vendidos</p>

          <div className="overflow-y-auto space-y-7 overflow-y-auto px-6 pb-6">
            {mostSoldProducts.map((product) => (
              <MostSoldProductItem key={product.productId} product={product} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;
