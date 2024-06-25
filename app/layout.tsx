import "./globals.css";
import React from "react";
import { cn } from "./utils/func";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Layout from "@components/templates/Layout";
import { ThemeProvider } from "./providers/ThemeProvider";
import { TanstackQueryProvider } from "./providers/TanstackQueryProvider";
import { MainStoreContext, MainStoreProvider } from "provider/MainStore";
import { Toaster } from "@components/ui/toaster";

const outfit = Outfit({ subsets: ["latin"] });
const ogImg = process.env.OG_IMG ?? "";
export const metadata: Metadata = {
  title: "teamwork",
  description: "Project Management",
  metadataBase: new URL(process.env.NEXT_BASE_URL ?? ""),
  openGraph: {
    title: "teamwork",
    description: "Agile Project Management",
    url: process.env.BASE_URL,
    siteName: "teamwork",
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
        alt: "Project Management",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanstackQueryProvider>
      <html lang="en">
        <body className={cn(
          "min-h-screen",
          outfit.className
        )}>
          <MainStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Layout>
                {children}
                <Toaster />
              </Layout>
            </ThemeProvider>
          </MainStoreProvider>
        </body>
      </html>
    </TanstackQueryProvider>
  );
}
