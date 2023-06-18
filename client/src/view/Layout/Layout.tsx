import React, { PropsWithChildren } from 'react'
import styles from './Layout.module.scss'
import { Inter, Poppins } from 'next/font/google'
import cn from 'clsx'
import { StateProvider } from '@/context/StateContext'
import { reducer, initialState } from '@/context/StateReducer'
const font = Poppins({ weight: ['900', '800', '700', '600', '500', '400'], subsets: ['latin'] })

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className={cn(styles.wrapper, font.className)}>
      <StateProvider reducer={reducer} initialState={initialState}>
        {children}
      </StateProvider>
    </main>
  )
}
