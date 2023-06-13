import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Main } from '@/view/Main/Main'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <Main />
}
