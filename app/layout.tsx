import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider'
import { Navbar } from '@/components/Navbar/Navbar'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Days Labs Demo App",
  description: "Learn Identity (name on the works) is an educative web platform designed to bridge the gap between identity experts and eager students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
