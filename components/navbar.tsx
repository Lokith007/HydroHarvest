"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Droplets } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const links = [
    { href: "/", label: "Home" },
    { href: "/form", label: "Form" },
    { href: "/dashboard", label: "Dashboard" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-600/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-green-600 to-amber-500 text-white shadow">
            <Droplets className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight text-slate-900">HydroHarvest</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition",
                pathname === l.href
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-900 hover:bg-blue-600/10 hover:text-blue-600",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
