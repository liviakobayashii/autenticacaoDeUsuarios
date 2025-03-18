"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { browser: "mousepad", vendas: 29, fill: "#193CB8" },
  { browser: "mouse", vendas: 26, fill: "#1447e6" },
  { browser: "teclado", vendas: 21, fill: "#155dfc" },
  { browser: "monitor", vendas: 14, fill: "#2b7fff" },
  { browser: "cabinete", vendas: 8, fill: "#50a2ff" },
];

const chartConfig = {
  vendas: {
    label: "Vendas",
  },
  mousepad: {
    label: "Mousepad",
  },
  mouse: {
    label: "Mouse",
  },
  teclado: {
    label: "Teclado",
  },
  monitor: {
    label: "Monitor",
  },
  cabinete: {
    label: "Cabinete",
  },
} satisfies ChartConfig;

export function ChartBarMixed() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData} layout="vertical">
        <YAxis
          dataKey="browser"
          type="category"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            chartConfig[value as keyof typeof chartConfig]?.label
          }
        />
        <XAxis dataKey="vendas" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="vendas" layout="vertical" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
