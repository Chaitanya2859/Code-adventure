import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Jersey_10 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

import {
  ClerkProvider,
} from '@clerk/nextjs'
import Provider from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gameFont = Jersey_10({
  variable: "--font-game",
  subsets: ["latin"],
  weight: ['400']
});


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${gameFont.variable} ${inter.variable} ${geistMono.variable} antialiased`}
      >          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
             <Provider attribute="class" defaultTheme="system">
            {children}
            </Provider>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
