"use client"

type WaterGaugeProps = {
  value: number // 0-100
  label?: string
}

export function WaterGauge({ value, label }: WaterGaugeProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className="w-full">
      {label ? <div className="mb-2 text-sm font-medium text-slate-900">{label}</div> : null}
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-900/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 via-green-600 to-amber-500 transition-[width]"
          style={{ width: `${clamped}%` }}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={clamped}
          role="progressbar"
        />
      </div>
      <div className="mt-1 text-right text-xs text-slate-900/70">{clamped}%</div>
    </div>
  )
}
