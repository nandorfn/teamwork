import React from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Layout from "@components/templates/Layout";
import { cn } from "./utils/func";
import { ThemeProvider } from "./providers/ThemeProvider";
import { TanstackQueryProvider } from "./providers/TanstackQueryProvider";

const outfit = Outfit({ subsets: ['latin'] })
const ogImg = 'https://ucarecdn.com/a742a730-c718-46cb-b148-e19418c46429/-/preview/1000x525/'
export const metadata: Metadata = {
  title: 'teamwork',
  description: 'Project Management',
  metadataBase: new URL('https://riotgear.vercel.app'),
  openGraph: {
    title: 'teamwork',
    description: 'Agile Project Management',
    url: 'https://riotgear.vercel.app',
    siteName: 'teamwork',
    images: [
      {
        url: ogImg,
        width: 800,
        height: 600,
      },
      {
        url: ogImg,
        width: 1800,
        height: 1600,
        alt: 'Project Management',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanstackQueryProvider>
      <html lang="en">
        <body className={cn(
          'min-h-screen',
          outfit.className
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Layout>
              {children}
            </Layout>
          </ThemeProvider>
        </body>
      </html>
    </TanstackQueryProvider>
  );
}
