import React, { PropsWithChildren } from 'react'

async function Sidebar({ children }: PropsWithChildren) {
  return (
    <div className="h-full">
      {/* <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter /> */}
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  )
}

export default Sidebar