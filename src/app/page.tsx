import type React from "react"
import { Navbar } from "../../components/navbar"
import { Hero } from "../../components/hero"
import Link from "next/link"
import { Leaf, Droplets, Sun } from "lucide-react"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <section className="mx-auto max-w-6xl px-4 pb-16 animate-in fade-in-50">
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<Droplets className="h-5 w-5 text-blue-600" aria-hidden="true" />}
            title="Predict Water Levels"
            desc="See daily and monthly groundwater trends to plan irrigation efficiently."
          />
          <FeatureCard
            icon={<Leaf className="h-5 w-5 text-green-600" aria-hidden="true" />}
            title="Crop Suggestions"
            desc="Get crop recommendations aligned with projected water availability."
          />
          <FeatureCard
            icon={<Sun className="h-5 w-5 text-amber-500" aria-hidden="true" />}
            title="Save Energy"
            desc="Optimize pump usage with better timing to reduce energy costs."
          />
        </div>

        <div className="mt-8">
          <Link
            href="/form"
            className="inline-flex rounded-md bg-blue-600 px-5 py-2.5 text-white shadow transition hover:scale-[1.02]"
          >
            Start Prediction
          </Link>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="rounded-xl border border-blue-600/10 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/10">{icon}</div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-900/80">{desc}</p>
    </div>
  )
}
