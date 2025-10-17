import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import CartHeaderControls from "_/modules/transaction/components/CartHeaderControls";
import CartDrawer from "_/modules/transaction/components/CartDrawer";
import ThemeToggle from "_/modules/common/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dummy Store by Zakky",
  description: "A simple e-commerce store built with Next.js, Redux, TypeScript, Tailwind CSS, and Redux-persist.",
};

/**
 * Root layout with global fonts, providers, header and cart drawer.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-light light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <nav className="fixed w-full top-0 p-8 border-b border-[color:var(--surface-border)]/60 bg-[color:var(--surface)]/50 backdrop-blur flex items-center justify-between">
            <h1 className="text-xl font-semibold">Simple Store</h1>
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
  );
}
