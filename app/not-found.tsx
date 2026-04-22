import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-8xl font-black text-[#f7e774]">404</div>
        <h2 className="text-2xl font-black text-slate-900">Page Not Found</h2>
        <p className="text-slate-500 font-medium text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f172a] text-white font-bold text-sm hover:bg-[#d4a500] transition-all"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm border-2 border-slate-200 hover:border-[#f7e774] transition-all"
          >
            <Search className="h-4 w-4" />
            Browse Events
          </Link>
        </div>
      </div>
    </div>
  )
}
