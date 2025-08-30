"use client"

import Link from "next/link"
import { Droplets } from "lucide-react"

export function Hero() {
  return (
    <section className="relative isolate animate-in fade-in-50">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 via-green-600 to-amber-500 opacity-20" />
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow">
            <Droplets className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            HydroHarvest – Smart Groundwater Predictions for Farmers.
          </h1>
          <p className="text-pretty mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-900/80 md:text-lg">
            Plan your crops, schedule irrigation, and save water with AI-driven insights.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/form"
              className="rounded-md bg-blue-600 px-5 py-2.5 text-white shadow transition hover:scale-[1.02] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="Start Prediction"
            >
              Start Prediction
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md border border-blue-600/20 bg-white px-5 py-2.5 text-slate-900 transition hover:bg-blue-600/10 hover:text-blue-600"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
