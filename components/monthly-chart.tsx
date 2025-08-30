"use client"

import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"

type MonthlyChartProps = {
  data: Array<{ day: number; groundwater: number; rainfall: number }>
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  return (
    <div className="rounded-xl border border-blue-600/10 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-medium text-slate-900">Monthly Groundwater Levels</h3>
      <ChartContainer
        // Define series labels and colors; used by ChartTooltip and CSS vars
        config={{
          rainfall: { label: "Rainfall (mm)", color: "#16a34a" }, // green-600
          groundwater: { label: "Groundwater (%)", color: "#1d4ed8" }, // blue-600
        }}
        className="h-64 w-full"
      >
        <BarChart data={data}>
          <CartesianGrid stroke="#0f172a14" />
          <XAxis dataKey="day" stroke="#0f172a" />
          <YAxis stroke="#0f172a" />
          <ChartTooltip content={<ChartTooltipContent labelKey="day" />} />
          <Bar dataKey="rainfall" fill="var(--color-rainfall)" radius={[4, 4, 0, 0]} />
          <Line type="monotone" dataKey="groundwater" stroke="var(--color-groundwater)" strokeWidth={2} dot={false} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
