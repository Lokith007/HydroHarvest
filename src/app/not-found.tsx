import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-900/70">The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white">
        Go Home
      </Link>
    </main>
  )
}
