import { type ChartConfig } from "@/components/ui/chart";

export const chartData = [
  { month: "Janeiro", produtos: 96, servicos: 49 },
  { month: "Fevereiro", produtos: 205, servicos: 152 },
  { month: "Março", produtos: 237, servicos: 120 },
  { month: "Abril", produtos: 300, servicos: 190 },
  { month: "Maio", produtos: 209, servicos: 130 },
  { month: "Junho", produtos: 214, servicos: 140 },
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
