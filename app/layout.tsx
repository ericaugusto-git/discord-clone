import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import ModalProvider from '@/components/providers/modal-provider'
import { SocketProvider } from '@/components/providers/socket-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { CurrentUserProvider } from '@/components/providers/profile-provider'
import { Toaster } from '@/components/ui/sonner'

const font = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discourse',
  description: 'Live chat app | made by Eric Augusto',
}

export default function RootLayout({children,}: { children: React.ReactNode}) {
  
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning >
      <body className={cn(font.className, "bg-[#f7f7f8] dark:bg-[#1D1D1D]")} >
        <ThemeProvider 
        attribute='class'
        defaultTheme='dark'
        enableSystem={true}
        storageKey='discord-theme'>
        <SocketProvider>
        <ModalProvider/>
          <QueryProvider>
            <CurrentUserProvider>
              {children}
              <Toaster />
            </CurrentUserProvider>
          </QueryProvider>
        </SocketProvider>
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  )
}
