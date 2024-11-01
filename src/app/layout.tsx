import type { Metadata } from "next";
import localFont from "next/font/local";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/components/app-sidebar"
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <h1 className="text-4xl font-bold text-black text-center py-4">
          Indexed DB in Next.js
        </h1>
        <SidebarProvider>
          <AppSidebar />
          <main className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
