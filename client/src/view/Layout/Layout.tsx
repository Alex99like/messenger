import React, { PropsWithChildren } from 'react'
import styles from './Layout.module.scss'
import { Inter } from 'next/font/google'
import cn from 'clsx'
const inter = Inter({ subsets: ['latin'] })

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className={cn(styles.wrapper, inter.className)}>
      {children}
    </main>
  )
}
