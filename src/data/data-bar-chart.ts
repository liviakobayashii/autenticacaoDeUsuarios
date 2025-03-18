import { type ChartConfig } from "@/components/ui/chart";

export const chartData = [
  { month: "Outubro", produtos: 241, servicos: 190 },
  { month: "Novembro", produtos: 205, servicos: 152 },
  { month: "Dezembro", produtos: 214, servicos: 120 },
  { month: "Janeiro", produtos: 96, servicos: 49 },
  { month: "Fevereiro", produtos: 159, servicos: 105 },
  { month: "Março", produtos: 214, servicos: 140 },
];

export const chartConfig = {
  produtos: {
    label: "Produtos",
    color: "#2563eb",
  },
  servicos: {
    label: "Serviços",
    color: "#60a5fa",
  },
} satisfies ChartConfig;
