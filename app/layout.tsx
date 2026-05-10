import './globals.css'
import QueryProvider from '@/providers/query-provider'
import { SettingsProvider } from '@/providers/settings-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SettingsProvider>
          <QueryProvider>{children}</QueryProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}