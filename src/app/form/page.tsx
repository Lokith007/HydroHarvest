"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "../../../components/navbar"
import { Droplets, Leaf, MapPin, CalendarIcon } from "lucide-react"

type FormState = {
  crop: string
  soil: string
  location: string
  date: string
}

export default function FormPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    crop: "",
    soil: "",
    location: "",
    date: "",
  })
  const [errors, setErrors] = useState<Partial<FormState>>({})

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.crop) e.crop = "Crop type is required."
    if (!form.soil) e.soil = "Soil type is required."
    if (!form.location) e.location = "Location is required."
    if (!form.date) e.date = "Date is required."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const params = new URLSearchParams(form as Record<string, string>)
    router.push(`/dashboard?${params.toString()}`)
  }

  return (
    <main>
      <Navbar />
      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 via-green-600 to-amber-500 opacity-10" />
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-balance text-2xl font-semibold text-slate-900">Enter Details</h1>
          <p className="mt-1 text-sm text-slate-900/70">
            Provide your crop, soil, location, and target date to generate predictions.
          </p>

          <form
            onSubmit={submit}
            className="mt-6 grid gap-4 rounded-xl border border-blue-600/10 bg-white p-4 shadow-sm"
          >
            <Field
              id="crop"
              label="Crop type"
              icon={<Leaf className="h-4 w-4 text-green-600" aria-hidden="true" />}
              value={form.crop}
              onChange={(v) => setForm((s) => ({ ...s, crop: v }))}
              placeholder="e.g., Maize"
              error={errors.crop}
            />
            <Field
              id="soil"
              label="Soil type"
              icon={<Droplets className="h-4 w-4 text-blue-600" aria-hidden="true" />}
              value={form.soil}
              onChange={(v) => setForm((s) => ({ ...s, soil: v }))}
              placeholder="e.g., Loamy"
              error={errors.soil}
            />
            <Field
              id="location"
              label="Location"
              icon={<MapPin className="h-4 w-4 text-amber-500" aria-hidden="true" />}
              value={form.location}
              onChange={(v) => setForm((s) => ({ ...s, location: v }))}
              placeholder="e.g., Fresno, CA"
              error={errors.location}
            />
            <Field
              id="date"
              label="Date"
              type="date"
              icon={<CalendarIcon className="h-4 w-4 text-slate-900" aria-hidden="true" />}
              value={form.date}
              onChange={(v) => setForm((s) => ({ ...s, date: v }))}
              error={errors.date}
            />

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-5 py-2.5 text-white shadow transition hover:scale-[1.01] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-label="Start Prediction"
              >
                Start Prediction
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

function Field({
  id,
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  id: string
  label: string
  icon: React.ReactNode
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  error?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-900">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-blue-600/10">{icon}</span>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-blue-600/20 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-900/40 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
      />
      {error ? <p className="mt-1 text-xs text-amber-500">{error}</p> : null}
    </div>
  )
}
