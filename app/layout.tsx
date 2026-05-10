import './globals.css'
import QueryProvider from '@/providers/query-provider'
import { SettingsProvider } from '@/providers/settings-provider'
export const metadata = {
  title: 'AyahGlow',
  description: 'Modern Quran Reading Experience',
  icons: {
    icon: '/favicon.ico',
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div >
      <html lang="en" suppressHydrationWarning>
      <body>
        <SettingsProvider >
          <QueryProvider>{children}</QueryProvider>
        </SettingsProvider>
      </body>
    </html>
    </div>
  )
}