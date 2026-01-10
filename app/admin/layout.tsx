'use client'

import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminThemeProvider } from '@/components/admin/theme-provider'
import { AdminAuthProvider } from '@/components/admin/auth-provider'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  return (
    <AdminAuthProvider>
      <AdminThemeProvider>
        <div className="min-h-screen bg-[#0a0a0a]">
          {/* Only show sidebar if not on login page */}
          {!isLoginPage && <AdminSidebar />}
          
          {/* Main Content */}
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={isLoginPage ? '' : 'lg:ml-[280px] min-h-screen transition-all duration-300 pb-20 lg:pb-0'}
          >
            {children}
          </motion.main>
        </div>
      </AdminThemeProvider>
    </AdminAuthProvider>
  )
}
