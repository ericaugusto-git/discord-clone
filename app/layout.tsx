import { DirectsProvider } from '@/components/providers/directs-provider'
import ModalProvider from '@/components/providers/modal-provider'
import { CurrentUserProvider } from '@/components/providers/profile-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { SocketProvider } from '@/components/providers/socket-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import SessionWrapper from '@/components/SessionWrapper'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'

const font = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discourse',
  description: 'Live chat app | made by Eric Augusto',
}

export default function RootLayout({children,}: { children: React.ReactNode}) {
  
  return (
    <SessionWrapper 
    >
    <html lang="en" suppressHydrationWarning >
      <body className={cn(font.className, "bg-[#f7f7f8] dark:bg-[#1D1D1D]")} >
        <ThemeProvider 
        attribute='class'
        defaultTheme='dark'
        enableSystem={true}
        storageKey='discourse-theme'>
        <SocketProvider>
        <ModalProvider/>
          <QueryProvider>
            <CurrentUserProvider>
              <DirectsProvider>

              {children}
              <div className="absolute inset-1 rounded-bento-wrapper-radius border-[7px] dark:border-[#232323] border-[#e7e7e7] -z-10"></div>
              <Toaster />
              </DirectsProvider>
            </CurrentUserProvider>
          </QueryProvider>
        </SocketProvider>
        </ThemeProvider>
        </body>
    </html>
    </SessionWrapper>
  )
}
