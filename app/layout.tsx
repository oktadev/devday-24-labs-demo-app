import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider'
import { Navbar } from '@/components/Navbar/Navbar'
import { getSession } from '@auth0/nextjs-auth0'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Dev Days Labs Demo App",
    default: "Dev Days Labs Demo App"
  },
  description: "Learn Identity (name on the works) is an educative web platform designed to bridge the gap between identity experts and eager students.",
  applicationName: "Test",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
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
          <header>
            <Navbar user={session?.user} />
          </header>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
