import React, { PropsWithChildren } from 'react'
import { DesktopSidebar } from './DesktopSidebar'

async function Sidebar({ children }: PropsWithChildren) {
  return (
    <div className="h-full">
      <DesktopSidebar />
      {/* <MobileFooter /> */}
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  )
}

export default Sidebar