
"use client"

import { X, Leaf, Droplets } from "lucide-react"
import { WaterGauge } from "./water-gauge"

type DayModalProps = {
  open: boolean
  onClose: () => void
  dateLabel: string
  suggestedCrop: string
  requiredWaterPct: number
}

export function DayModal({ open, onClose, dateLabel, suggestedCrop, requiredWaterPct }: DayModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />
      {/* card */}
      <div className="relative mx-4 w-full max-w-md overflow-hidden rounded-xl border border-blue-600/10 bg-white shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 via-green-600 to-amber-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5" aria-hidden="true" />
              <h3 className="font-semibold">{dateLabel}</h3>
            </div>
            <button onClick={onClose} className="rounded p-1 hover:bg-white/10" aria-label="Close modal">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4 flex items-center gap-2 text-slate-900">
            <Leaf className="h-5 w-5 text-green-600" aria-hidden="true" />
            <p className="text-sm">
              Suggested Crop: <span className="font-medium">{suggestedCrop}</span>
            </p>
          </div>

          <WaterGauge value={requiredWaterPct} label="Required Water Level" />
        </div>
      </div>
    </div>
  )
}
