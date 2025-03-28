"use client";

import { useContext, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { LoggedUserContext } from "@/contexts/user-context";
import SheetMenu from "@/components/sheet";
import CustomCard from "@/components/card";
import TopCard from "@/components/top-card";
import { ChartBarMixed } from "@/components/charts/mixed";
import { DonutChart } from "@/components/charts/donut";
import ChartBar, { chartData } from "@/components/charts/bar";

export default function Dashboard() {
  const userLoggedCtx = useContext(LoggedUserContext);
  const router = useRouter();

  // useEffect(() => {
  //   if (!userLoggedCtx?.user) {
  //     redirect("/login");
  //   }
  // }, [userLoggedCtx, router]);

  // if (
  //   userLoggedCtx?.loading ||
  //   (!userLoggedCtx?.loading && !userLoggedCtx?.user)
  // ) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p className="text-2xl font-bold text-blue-600">Carregando...</p>
  //     </div>
  //   );
  // }

  const totalProdutos = chartData.reduce((acc, item) => acc + item.produtos, 0);
  const totalServicos = chartData.reduce((acc, item) => acc + item.servicos, 0);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center h-20 px-4 py-12">
        <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
        <SheetMenu />
      </header>

      <main className="flex-1 flex flex-col bg-neutral-200 overflow-auto">
        <section className="grid max-md:grid-cols-2 grid-cols-4 gap-4 lg:gap-10 mt-6 p-4">
          <TopCard
            title="Total de produtos vendidos"
            titleMob="Produtos"
            icon="hugeicons:sale-tag-02"
            description="Total de produtos vendidos nos últimos 6 meses."
            content={totalProdutos}
          />
          <TopCard
            title="Total de serviços prestados"
            titleMob="Serviços"
            icon="solar:money-bag-linear"
            description="Total de serviços prestados nos últimos 6 meses."
            content={totalServicos}
          />
          <TopCard
            title="Valor total das vendas"
            titleMob="Vendas"
            icon="streamline:money-graph-analytics-business-product-graph-data-chart-analysis"
            description="Valor total de serviços prestados e produtos vendidos nos últimos 6 meses."
            content="R$96.235"
          />
          <TopCard
            title="Novos clientes"
            titleMob="Novos clientes"
            icon="f7:person-3"
            description="Novos clientes em 30 dias."
            content={32}
          />
        </section>

        <section className="grid max-md:grid-cols-1 grid-cols-3 gap-4 p-4">
          <CustomCard
            title="Total de vendas"
            description="Vendas de produtos e serviços nos últimos 6 meses."
          >
            <ChartBar />
          </CustomCard>
          <CustomCard
            title="Outsourcing"
            description="Principais serviços realizados nos últimos 60 dias."
          >
            <DonutChart />
          </CustomCard>
          <CustomCard
            title="Produtos"
            description="Produtos mais vendidos nos últimos 60 dias."
          >
            <ChartBarMixed />
          </CustomCard>
        </section>
      </main>
    </div>
  );
}
