import type { Metadata } from "next";
import { Geist, Jersey_10 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

import {
  ClerkProvider,
} from '@clerk/nextjs'
import Provider from "./provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const gameFont = Jersey_10({
  variable: "--font-game",
  subsets: ["latin"],
  weight: ['400']
});

export const metadata: Metadata = {
  title: "Code Adventure",
  description: "Let your coding adventure begin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning className="dark">
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${gameFont.variable} antialiased`}
      >          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
             <Provider attribute="class" defaultTheme="system">
            {children}
            <Toaster />
            </Provider>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
