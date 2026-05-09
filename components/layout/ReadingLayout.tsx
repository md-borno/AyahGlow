'use client'

import { ReactNode } from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import BottomPlayer from './BottomPlayer'
interface Props {
  children: ReactNode
}

export default function ReadingLayout({
  children,
}: Props) {
  return (
    <div className="h-screen bg-[#f8f7f4] dark:bg-[#111827]">
      <Topbar />

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 py-10 pb-40">
            {children}
          </div>
        </main>
      </div>

      <BottomPlayer />
    </div>
  )
}