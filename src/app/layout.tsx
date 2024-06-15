import type { Metadata } from "next";
import "./globals.css";
import { Sarabun } from 'next/font/google'

const sarabun = Sarabun({
  weight: ['400', '700'],
  subsets: ['thai'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "เสวนาค่ายอยากเป็นหมอ",
  description: "รายละเอียด",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={sarabun.className}>
      <body>{children}</body>
    </html>
  );
}