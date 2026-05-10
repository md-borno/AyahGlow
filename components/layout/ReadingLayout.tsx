'use client'

import { ReactNode } from 'react'
// import Topbar from './Topbar'
import Sidebar from './Sidebar'
import BottomPlayer from './BottomPlayer'
interface Props {
  children: ReactNode
}

export default function ReadingLayout({
  children,
}: Props) {
  return (
  <> 
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-screen mx-auto ">
            {children}
          </div>
        </main>
      </div>

      <BottomPlayer />
  </>
  )
}