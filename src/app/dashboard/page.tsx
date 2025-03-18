"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import CustomCard from "@/components/card";
import TopCard from "@/components/top-card";
import ChartBar, { chartData } from "@/components/charts/bar";
import { DonutChart } from "@/components/charts/donut";
import { ChartBarMixed } from "@/components/charts/mixed";

export default function Dashboard() {
  const router = useRouter();

  const totalProdutos = chartData.reduce((acc, item) => acc + item.produtos, 0);
  const totalServicos = chartData.reduce((acc, item) => acc + item.servicos, 0);

  const logout = () => {
    localStorage.removeItem("@LoggedUser");
    router.push("/login");
  };

  return (
    <>
      <header className="flex justify-between items-center h-20 px-4 py-12">
        <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
        <div className="flex gap-1 p-4 justify-center items-center hover:text-blue-600 hover:cursor-pointer duration-200">
          <Icon
            icon="material-symbols:logout-rounded"
            className="text-blue-600 font-bold text-xl"
          />
          <p onClick={logout}>Logout</p>
        </div>
      </header>
      <main className="flex flex-col bg-neutral-200 min-h-[calc(100vh-80px)]">
        <section className="grid grid-cols-4 gap-3 mt-6 p-4">
          <TopCard
            title="Total de produtos vendidos"
            icon="hugeicons:sale-tag-02"
            description="Total de produtos vendidos nos últimos 6 meses."
            content={totalProdutos}
          />
          <TopCard
            title="Total de serviços prestados"
            icon="solar:money-bag-linear"
            description="Total de serviços prestados nos últimos 6 meses."
            content={totalServicos}
          />
          <TopCard
            title="Valor total das vendas"
            icon="streamline:money-graph-analytics-business-product-graph-data-chart-analysis"
            description="Valor total de serviços prestados e produtos vendidos nos últimos 6 meses."
            content="R$96.235,56"
          />
          <TopCard
            title="Novos clientes"
            icon="f7:person-3"
            description="Novos clientes em 30 dias."
            content={32}
          />
        </section>
        <section className=" grid grid-cols-3 gap-4 p-4">
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
    </>
  );
}
