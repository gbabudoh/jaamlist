'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { MobileNav } from '@/components/mobile-nav'
import { Footer } from '@/components/footer'
import { PageWrapper } from '@/components/page-wrapper'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname === '/dashboard'
  const isLoginPage = pathname === '/login' || pathname === '/signup'
  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute) {
    // Admin routes get clean slate - no public nav/footer
    return <>{children}</>
  }

  return (
    <>
      <div className="hidden lg:block">
        {!isLoginPage && <Navbar />}
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
