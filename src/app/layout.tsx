import { Geist, Geist_Mono } from 'next/font/google'

import ThemeToggle from '_/modules/common/components/ThemeToggle'
import CartDrawer from '_/modules/transaction/components/CartDrawer'
import CartHeaderControls from '_/modules/transaction/components/CartHeaderControls'

import Providers from './Providers'

import type { Metadata } from 'next'




import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

import { t } from '_/i18n'

import Link from 'next/link'
import {Lineicons} from '@lineiconshq/react-lineicons'
import {GithubOutlined} from '@lineiconshq/free-icons'

import Button from '_/modules/common/components/Button'

export const metadata: Metadata = {
  title: t('common.appTitleDetailed'),
  description: t('common.appDescription'),
}

/**
 * Root layout with global fonts, providers, header and cart drawer.
 */
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className="theme-light light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <nav className="fixed w-full top-0 p-8 border-b border-[color:var(--surface-border)]/60 bg-[color:var(--surface)]/50 backdrop-blur flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">{t('common.appTitle')}</h1>
              <Link href="https://github.com/zrfikry/storeapp">
                <Button className="border-gray-500" variant="secondary" size="sm">
                  <span className="mr-1">Github</span>
                  <Lineicons icon={GithubOutlined} size={16} />
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <CartHeaderControls />
            </div>
          </nav>

          <div className="pt-[60px]">
            {children}
          </div>

          <CartDrawer />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
