import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}