import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig, chartData } from "@/data/data-bar-chart";

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
        <Bar dataKey="produtos" fill="var(--color-produtos)" radius={4} />
        <Bar dataKey="servicos" fill="var(--color-servicos)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
