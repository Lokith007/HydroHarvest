
"use client"

import { useMemo, useState } from "react"
import { DayModal } from "./day-modal"
import { cn } from "../src/app/lib/utils"

type CalendarProps = {
  year?: number
  month?: number // 0-11
}

const crops = ["Maize", "Wheat", "Rice", "Soybean", "Cotton", "Sorghum"]
function pickCrop(seed: number) {
  return crops[seed % crops.length]
}

export function Calendar({ year, month }: CalendarProps) {
  const now = new Date()
  const y = year ?? now.getFullYear()
  const m = month ?? now.getMonth()

  const [open, setOpen] = useState(false)
  const [activeDay, setActiveDay] = useState<number | null>(null)

  const firstDay = new Date(y, m, 1)
  const startWeekday = firstDay.getDay() // 0 Sun
  const daysInMonth = new Date(y, m + 1, 0).getDate()

  const grid = useMemo(() => {
    const cells = []
    for (let i = 0; i < startWeekday; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }, [startWeekday, daysInMonth])

  function openDay(d: number) {
    setActiveDay(d)
    setOpen(true)
  }

  function requiredWaterPctForDay(d: number) {
    // simple pseudo model: wave across the month
    const wave = Math.round(50 + 40 * Math.sin(((d + 4) / 31) * Math.PI))
    return Math.max(10, Math.min(100, wave))
  }

  const monthLabel = new Date(y, m, 1).toLocaleString(undefined, {
    month: "long",
    year: "numeric",
  })

  return (
    <div>
      <div className="mb-3 text-sm font-medium text-slate-900">{monthLabel}</div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-900/70">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-1 font-medium">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-2">
        {grid.map((d, i) => {
          const isToday = d !== null && y === now.getFullYear() && m === now.getMonth() && d === now.getDate()
          const pct = d ? requiredWaterPctForDay(d) : 0
          return (
            <button
              key={i}
              disabled={d === null}
              onClick={() => d && openDay(d)}
              className={cn(
                "aspect-square rounded-md border border-blue-600/10 p-2 text-left transition",
                d ? "bg-white hover:scale-[1.01] hover:shadow-sm" : "bg-slate-900/5 opacity-50",
                isToday && "ring-2 ring-blue-600",
              )}
              aria-label={d ? `Open day ${d}` : "Empty"}
            >
              <div className="flex h-full flex-col">
                <span className="text-xs font-medium text-slate-900">{d ?? ""}</span>
                {d ? (
                  <span
                    className="mt-auto h-1.5 w-full rounded-full bg-gradient-to-r from-blue-600 via-green-600 to-amber-500"
                    style={{ width: `${pct}%` }}
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            </button>
          )
        })}
      </div>

      <DayModal
        open={open}
        onClose={() => setOpen(false)}
        dateLabel={
          activeDay
            ? new Date(y, m, activeDay).toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : ""
        }
        suggestedCrop={pickCrop((activeDay ?? 1) + m + y)}
        requiredWaterPct={activeDay ? requiredWaterPctForDay(activeDay) : 0}
      />
    </div>
  )
}
