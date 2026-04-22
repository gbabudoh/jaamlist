'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { MobileNav } from '@/components/mobile-nav'
import { Footer } from '@/components/footer'
import { PageWrapper } from '@/components/page-wrapper'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')
  const isCreatorDashboard = pathname?.startsWith('/creator/dashboard')
  const isLoginPage = pathname === '/login' || pathname === '/signup'
  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute || isCreatorDashboard || isDashboard) {
    return (
      <>
        {children}
        <MobileNav />
      </>
    )
  }

  return (
    <>
      {/* Desktop navbar — full nav */}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      {/* Mobile header — slim brand bar always visible at top */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-4 h-14 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <Link href="/">
          <Image
            src="/logo--.png"
            alt="Jaamlist"
            width={110}
            height={44}
            priority
            unoptimized
          />
        </Link>
        {isLoginPage && (
          <Link
            href="/"
            className="text-xs font-semibold text-[#d4a500] hover:underline"
          >
            Home
          </Link>
        )}
      </div>

      <main>
        <PageWrapper>
          {children}
        </PageWrapper>
      </main>
      <MobileNav />
      {!isDashboard && !isLoginPage && <Footer />}
    </>
  )
}
