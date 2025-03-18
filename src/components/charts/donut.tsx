"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { browser: "Design", servicos: 28, fill: "#193CB8" },
  { browser: "Marketing", servicos: 24, fill: "#1447e6" },
  { browser: "Sites", servicos: 21, fill: "#155dfc" },
  { browser: "Aplicativos", servicos: 17, fill: "#2b7fff" },
  { browser: "IA", servicos: 15, fill: "#50a2ff" },
];

const chartConfig = {
  servicos: {
    label: "Serviços",
  },
  Sites: {
    label: "Sites",
    color: "hsl(var(--chart-1))",
  },
  Aplicativos: {
    label: "Aplicativos",
    color: "hsl(var(--chart-2))",
  },
  Design: {
    label: "Design",
    color: "hsl(var(--chart-3))",
  },
  Marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-4))",
  },
  IA: {
    label: "IA",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function DonutChart() {
  const totalServicos = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.servicos, 0);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="servicos"
          nameKey="browser"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalServicos.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Serviços
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
