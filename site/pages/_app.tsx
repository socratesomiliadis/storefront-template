import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { Inter } from 'next/font/google'

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <div id="fontWrapper" className={inter.variable}>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </div>
      </ManagedUIContext>
    </>
  )
}
