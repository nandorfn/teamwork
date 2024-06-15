import { CookiesProvider } from "next-client-cookies/server";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return <CookiesProvider>{children}</CookiesProvider>;
}