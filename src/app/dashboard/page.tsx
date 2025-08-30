"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "../../../components/navbar"
import { MonthlyChart } from "../../../components/monthly-chart"
import { Calendar } from "../../../components/calendar"

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function DashboardPage() {
  const params = useSearchParams()
  const crop = params.get("crop") || "Maize"
  const soil = params.get("soil") || "Loamy"
  const location = params.get("location") || "Your Farm"
  const date = params.get("date") || new Date().toISOString().slice(0, 10)

  const dt = new Date(date)
  const y = dt.getFullYear()
  const m = dt.getMonth()

  const data = useMemo(() => {
    const days = new Date(y, m + 1, 0).getDate()
    const arr = []
    for (let d = 1; d <= days; d++) {
      // demo model: groundwater baseline varies by soil + crop; rainfall pseudo-random
      const base =
        (soil.length % 7) * 5 +
        (crop.length % 5) * 3 +
        40 +
        Math.round(10 * Math.sin(((d + (crop.length % 3)) / days) * Math.PI))
      const rainfall = Math.round(10 + 20 * pseudoRandom(d + y + m))
      const groundwater = Math.max(10, Math.min(100, base - Math.round(rainfall / 3)))
      arr.push({ day: d, groundwater, rainfall })
    }
    return arr
  }, [crop, soil, y, m])

  return (
    <main>
      <Navbar />
      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 via-green-600 to-amber-500 opacity-10" />
        <div className="mx-auto max-w-6xl px-4 py-10">
          <header className="mb-6">
            <h1 className="text-balance text-2xl font-semibold text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-900/70">
              Location: <span className="font-medium text-slate-900">{location}</span> • Crop:{" "}
              <span className="font-medium text-slate-900">{crop}</span> • Soil:{" "}
              <span className="font-medium text-slate-900">{soil}</span>
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            <MonthlyChart data={data} />
            <div className="rounded-xl border border-blue-600/10 bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-medium text-slate-900">Irrigation Calendar</h3>
              <Calendar year={y} month={m} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
