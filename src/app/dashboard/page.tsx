"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import CustomCard from "@/components/card";
import TopCard from "@/components/top-card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { chartConfig, chartData } from "@/data/data-bar-chart";
import ChartBar from "@/components/charts/bar";

export default function Dashboard() {
  const router = useRouter();
  // const userCtx = useContext(AuthContext);

  // if (userCtx?.loading === true) {
  //   return (
  //     <div className="flex w-screen h-screen justify-center items-center">
  //       <h1 className="text-3xl font-bold">Carregando...</h1>
  //     </div>
  //   );
  // } else {
  //   if (!userCtx?.user) {
  //     redirect("/login");
  //   }

  const logout = () => {
    localStorage.removeItem("@LoggedUser");
    router.push("/login");
  };
  return (
    <>
      <header className="flex justify-between items-center h-20 p-4">
        <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
        <div className="flex gap-1 p-4 justify-center items-center hover:text-blue-600 hover:cursor-pointer duration-200">
          <Icon
            icon="material-symbols:logout-rounded"
            className="text-blue-600 font-bold text-xl"
          />
          <p onClick={logout}>Logout</p>
        </div>
      </header>
      <main className=" flex flex-col bg-neutral-200 min-h-[calc(100vh-80px)]">
        <section className="grid grid-cols-4 gap-3 p-4">
          <TopCard
            title="Total de produtos vendidos"
            icon="hugeicons:sale-tag-02"
            description="Total de produtos vendidos nos últimos 6 meses."
            content={1.261}
          />
          <TopCard
            title="Total de serviços prestados"
            icon="solar:money-bag-linear"
            description="Total de serviçoes prestados nos últimos 6 meses."
            content={12}
          />
          <TopCard
            title="Valor total das vendas"
            icon="streamline:money-graph-analytics-business-product-graph-data-chart-analysis"
            description="Valor total de serviços prestados e produtos vendidos nos últimos 6 meses."
            content="R$398.252,23"
          />

          <TopCard
            title="Novos clientes"
            icon="f7:person-3"
            description="Novos clientes em 30 dias."
            content={32}
          />
        </section>
        <section className="p-4">
          <div className="h-96 w-96">
            <CustomCard
              title="Total de vendas"
              description="Vendas de produtos e serviços nos últimos 6 meses"
            >
              <ChartBar />
            </CustomCard>
          </div>
        </section>
      </main>
    </>
    //
    // <>
    //   <Header />
    //   <section className="grid grid-cols-5 h-full">
    //     <section className="flex flex-col col-span-1 bg-neutral-200 h-[calc(100vh-96px)] justify-between pt-4 pb-4">
    //       <div>
    //         <div className="flex gap-1 p-3">
    //           <Icon
    //             icon="basil:user-outline"
    //             className="text-blue-600 font-bold text-xl"
    //           />
    //           <p className="text-black">{userCtx?.user?.name}</p>
    //         </div>
    //         <div className="flex gap-1 p-3">
    //           <Icon
    //             icon="ic:round-alternate-email"
    //             className="text-blue-600 font-bold text-xl"
    //           />
    //           <p className="text-black">{userCtx?.user?.email}</p>
    //         </div>
    //       </div>
    //       <div className="flex gap-1 p-3 cursor-pointer" onClick={logout}>
    //         <Icon
    //           icon="material-symbols:logout-rounded"
    //           className="text-blue-600 font-bold text-xl"
    //         />
    //         <p className="text-black">Sair</p>
    //       </div>
    //     </section>
    //     <div className="col-span-4 h-full ">oiee</div>
    //   </section>
    // </>
  );
}
// }
