"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
type Props = {
  data: Array<{ day: number; groundwater: number; rainfall: number }>
}

function aggregateWeekly(data: Props["data"]) {
  const weeks: Record<number, { week: string; rainfall: number; irrigation: number; gwSum: number; count: number }> = {}

  for (const d of data) {
    const weekIndex = Math.ceil(d.day / 7) // 1..5
    if (!weeks[weekIndex]) {
      weeks[weekIndex] = { week: `W${weekIndex}`, rainfall: 0, irrigation: 0, gwSum: 0, count: 0 }
    }
    weeks[weekIndex].rainfall += d.rainfall
    weeks[weekIndex].gwSum += d.groundwater
    weeks[weekIndex].count += 1
  }

  // Simple demo heuristic:
  // Higher rainfall reduces irrigation need. Lower groundwater increases it.
  const result = Object.values(weeks).map((w) => {
    const gwAvg = w.gwSum / Math.max(1, w.count)
    const baseNeed = 120 // arbitrary weekly target units
    const rainfallEffect = w.rainfall * 0.6
    const groundwaterEffect = Math.max(0, 40 - gwAvg) * 0.8
    const irrigation = Math.max(0, Math.round(baseNeed - rainfallEffect + groundwaterEffect))
    return { week: w.week, rainfall: Math.round(w.rainfall), irrigation }
  })

  return result
}

export function WeeklyAnalyticsBar({ data }: Props) {
  const weekly = aggregateWeekly(data)

  return (
    <div className="rounded-xl border border-blue-600/10 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-medium text-slate-900">Weekly Water Analytics</h3>
      <ChartContainer
        className="h-64 w-full"
        config={{
          rainfall: { label: "Rainfall", color: "hsl(var(--color-chart-2))" },
          irrigation: { label: "Irrigation Need", color: "hsl(var(--color-chart-1))" },
        }}
      >
        <BarChart data={weekly}>
          <CartesianGrid stroke="#0f172a14" />
          <XAxis dataKey="week" stroke="#0f172a" />
          <YAxis stroke="#0f172a" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="rainfall" fill="var(--color-rainfall)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="irrigation" fill="var(--color-irrigation)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
