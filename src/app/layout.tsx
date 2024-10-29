import type { Metadata } from "next";
import "./global.css";
//import { Sarabun } from 'next/font/google'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
};