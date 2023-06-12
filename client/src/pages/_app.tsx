import { StateProvider } from '@/context/StateContext'
import { initialState, reducer } from '@/context/StateReducer'
import '@/styles/globals.scss'
import { Layout } from '@/view/Layout/Layout'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    
      <Layout>
        <Head>
          <title>Messenger</title>
          <link rel='shortcut icon' href='/favicon.png' />
        </Head>
        <Component {...pageProps} />
      </Layout>
  )
}
