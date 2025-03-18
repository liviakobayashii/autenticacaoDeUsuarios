import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart";
export const chartData = [
  { month: "Outubro", produtos: 241, servicos: 190 },
  { month: "Novembro", produtos: 205, servicos: 152 },
  { month: "Dezembro", produtos: 214, servicos: 120 },
  { month: "Janeiro", produtos: 96, servicos: 49 },
  { month: "Fevereiro", produtos: 159, servicos: 105 },
  { month: "Março", produtos: 214, servicos: 140 },
];

const chartConfig = {
  produtos: {
    label: "Produtos",
    color: "#2563eb",
  },
  servicos: {
    label: "Serviços",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function ChartBar() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="produtos" fill="#155dfc" radius={4} />
        <Bar dataKey="servicos" fill="#50a2ff" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
