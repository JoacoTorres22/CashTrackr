import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'


export const metadata: Metadata = {
  title: "Cashtrackr",
  description: "",
};

const inter = Inter({subsets: ['latin']})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <h1>CashTrackr</h1>
        {children}
      </body>
    </html>
  );
}
